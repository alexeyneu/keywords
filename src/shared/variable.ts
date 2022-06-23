import * as yup from 'yup';

export const address:string = '0xb68a6627B1E89943Fc1af503E5cc5Db868A0F085';
export const addressCreator:string = '0xF02AB5ae5E270118b816fC7185533896F8509787';
export const wordValid = yup.string().typeError('Must be a string').lowercase('With the lower letter').matches(/^[a-z]+(?:\s[a-z]+){0,4}$/, 'Please match the requested format').required('Word is Required')