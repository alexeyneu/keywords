import * as yup from 'yup';

export const address:string = '0x14E774929f8ef9D5db08884B4E0C1fF4750ca209';
export const addressCreator:string = '0xF02AB5ae5E270118b816fC7185533896F8509787';
export const wordValid = yup.string().typeError('Must be a string').lowercase('With the lower letter').matches(/^[a-z]+(?:\s[a-z]+){0,4}$/, 'not').required('Word is Required')