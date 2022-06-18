import * as yup from 'yup';

export const address:string = '0x651420708ff5E66e27800c2e9dDF9B48194ff7C5';
export const addressCreator:string = '0xF02AB5ae5E270118b816fC7185533896F8509787';
export const wordValid = yup.string().typeError('Must be a string').lowercase('With the lower letter').matches(/^[a-z]+(?:\s[a-z]+){0,4}$/, 'not').required('Word is Required')