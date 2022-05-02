import * as yup from 'yup';

export const address:string = '0xe75f1c72e39C4f49D1f4f21ADFaAB1d31C6FAdD8';
export const addressCreator:string = '0xF02AB5ae5E270118b816fC7185533896F8509787';
export const wordValid = yup.string().typeError('Must be a string').lowercase('With the lower letter').matches(/^[a-z]+(?:\s[a-z]+){0,4}$/, 'not').required('Word is Required')