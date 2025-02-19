import parsePhoneNumber, { CountryCode } from 'libphonenumber-js';

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhoneNumber = (
  phoneNumber: string,
  countryCode: CountryCode
) => {
  console.log({ phoneNumber, countryCode });
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, countryCode);
  console.log('parsedPhoneNumber', parsedPhoneNumber?.isValid());
  return parsedPhoneNumber && parsedPhoneNumber.isValid();
};
