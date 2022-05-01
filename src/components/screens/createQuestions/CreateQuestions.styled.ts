import styled from "styled-components";
import {Form, Field} from "formik";

export const Container = styled.div`
   width: 100%;
   height: 100%;
   background: #84cdca;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`

export const Body = styled.div`
   width: 70%;
   height: 750px;
   padding-top:30px;

   background: #e8a87c;
   border-radius:10px;
`

export const BodyForm = styled(Form)`
   display:flex;
   flex-direction: column;
   align-items: center;
`

export const Title = styled.h2`
   font-family: 'Open Sans';
   font-size:25px;
   color: #40b3a2;
`

export const Input = styled(Field)`
   width: 50%;
   height: 45px;

   padding-left:20px;
   margin:20px 0;

   outline: none;
   border: none;
   border-radius:30px;

   font-family: 'Open Sans';
   font-size:17px;
   color: black;
`

export const Submit = styled.button`
   width: 10em;
   height: 2em;

   margin:20px 0;

   outline: none;
   border: none;
   border-radius:30px;

   font-family: 'Open Sans';
   font-size:23px;
   color: white;
   background: #c38d9d;
`

export const Error = styled.p`
   font-family: 'Open Sans';
   font-size:23px;
   color: red;
   margin-bottom:10px;
`

export const Loading = styled.p`
   font-family: 'Open Sans';
   font-size:25px;
   color: #ff7875;
   margin-top:10px;
`