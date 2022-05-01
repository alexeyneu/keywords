import * as yup from 'yup';

export const address:string = '0xd8B1e5A903E64651477c096C2acf5bA24D5c0305';
export const addressCreator:string = '0xF02AB5ae5E270118b816fC7185533896F8509787';
export const wordValid = yup.string().typeError('Must be a string').lowercase('With the lower letter').matches(/^[a-z]+(?:\s[a-z]+){0,4}$/, 'not').required('Word is Required')