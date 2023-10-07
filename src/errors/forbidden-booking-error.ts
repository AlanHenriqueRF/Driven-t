import { ApplicationError } from '@/protocols';

export function forbiddenError(): ApplicationError {
  return {
    name: 'ForbbidenBookingError',
    message: "forbidden to receive more user in room ",
  };
}
