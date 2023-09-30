import { ApplicationError } from '@/protocols';

export function paymentRequired(): ApplicationError {
  return {
    name: 'PAYMENT_REQUIRED',
    message: 'You must pay ticket!',
  };
}
