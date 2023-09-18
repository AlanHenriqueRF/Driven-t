import { Address, Enrollment } from '@prisma/client';
import { request } from '@/utils/request';
import { conflictError, invalidDataError, notFoundError, requestError } from '@/errors';
import { addressRepository, CreateAddressParams, enrollmentRepository, CreateEnrollmentParams } from '@/repositories';
import { exclude } from '@/utils/prisma-utils';
import httpStatus from 'http-status';

// TODO - Receber o CEP por parâmetro nesta função.
async function getAddressFromCEP(cep:string) {
  // FIXME: está com CEP fixo!
  if (cep.length !== 8){
    throw invalidDataError(`${cep}; Number of digits of cep, must be igual 8!`)
  }

  const result = (await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`)).data;

  // TODO: Tratar regras de negócio e lanças eventuais erros
  if (result.erro === true){
    throw invalidDataError(`${cep} this cep isn't found in database!`)
  }
  
  // FIXME: não estamos interessados em todos os campos
  const address = {
    logradouro: result.logradouro,
    complemento: result.complemento,
    bairro: result.bairro,
    cidade: result.localidade,
    uf: result.uf,
  }
  return address;
}

async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw requestError(httpStatus.BAD_REQUEST,'Bad Request');

  const [firstAddress] = enrollmentWithAddress.Address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(enrollmentWithAddress, 'userId', 'createdAt', 'updatedAt', 'Address'),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<Enrollment, 'userId' | 'createdAt' | 'updatedAt'>;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, 'createdAt', 'updatedAt', 'enrollmentId');
}

type GetAddressResult = Omit<Address, 'createdAt' | 'updatedAt' | 'enrollmentId'>;

async function createOrUpdateEnrollmentWithAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const enrollment = exclude(params, 'address');
  enrollment.birthday = new Date(enrollment.birthday);
  const address = getAddressForUpsert(params.address);
  const cep = params.address.cep;

  const result = (await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`)).data;

  // TODO - Verificar se o CEP é válido antes de associar ao enrollment.
  if (result.data.erro || result.data.message) throw requestError(httpStatus.BAD_REQUEST,'Bad request')


  const newEnrollment = await enrollmentRepository.upsert(params.userId, enrollment, exclude(enrollment, 'userId'));

  await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

export const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  getAddressFromCEP,
};
