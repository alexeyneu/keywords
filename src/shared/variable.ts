import * as yup from 'yup';

export const address:string = '0x695e5b651854d441abb804b6338de5f85b942339';
export const addressCreator:string = '0x9B75A438EA4C5e343A52672444DDea10e3676814';
export const wordValid = yup.string().typeError('Must be a string').lowercase('With the lower letter').matches(/^[a-z]+(?:\s[a-z]+){0,4}$/, 'Please match the requested format').required('Word is Required')