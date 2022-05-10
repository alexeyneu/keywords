import * as yup from 'yup';

export const address:string = '0xaDD87945F7cAC4F8D5367A1Efe3E70Ea26B5A4B4';
export const addressCreator:string = '0xF02AB5ae5E270118b816fC7185533896F8509787';
export const wordValid = yup.string().typeError('Must be a string').lowercase('With the lower letter').matches(/^[a-z]+(?:\s[a-z]+){0,4}$/, 'not').required('Word is Required')