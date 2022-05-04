import styled from "styled-components";
import {Form, Field} from "formik";

export const Body = styled.div`
   max-width:1240px;
   margin:0 auto;
   margin-top:110px;
`

export const Title = styled.h2`
   font-family: Roboto, sans-serif;
   font-size: 22px;
   text-align: center;
`

export const TextInfo = styled.p`
   font-family: Roboto, sans-serif;
   font-size: 17px;
   text-align: left;
   line-height:25px;
   padding:0 40px;
   margin-top:50px;
   margin-bottom:40px;
`

export const BodyForm = styled(Form)`
   display:flex;
   flex-direction: column;
   align-items: center;
   max-width:65%;
   margin:0 auto;
`

export const BodyInput = styled.div`
   width: 100%;
`

export const TitleInput = styled.span`
   font-family: Roboto, sans-serif;
   font-size: 19px;
   font-weight: 600;
`

export const Input = styled(Field)`
   width: 50%;
   height: 45px;

   padding-left:20px;
   margin:20px 0;

   outline: none;
   margin-left:10px;

   font-family: 'Open Sans';
   font-size:17px;
   color: black;
`

export const Submit = styled.button`
   width: 12em;
   height: 2.3em;

   margin:20px 0;

   outline: none;
   border: none;
   border-radius:15px;

   font-family: 'Open Sans';
   font-size:23px;
   color: white;
   background: #1e1e70;
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