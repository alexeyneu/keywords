import styled from "styled-components";
import {BodyBG} from '../../UI/Modals'
import {Form, Field} from 'formik'

const Header = styled.div`
   position: relative;
   width:90%;
   height:64px;
   margin: 0 auto;

   display: flex;
   align-items: center;
   justify-content: space-between;
`

export const GuessedBg = styled(BodyBG)`
   z-index: 10002;
`

export const GuessedModal = styled.div`
   position: relative;
   top:60px;

   width: 60%;
   height: 40%;
   background-color: #fff;
   border-radius:30px;
   margin:0 auto;
`

export const HeaderGuessed = styled(Header)`
   height:40px;
`

export const GuessedForm = styled(Form)`
   margin-top:20px;
   display:flex;
   flex-direction: column;
   align-items: center;
`

export const GuessedInput = styled(Field)`
   background-color:white;

   width: 50%;
   height: 45px;

   padding-left:20px;
   margin:20px 0;

   outline: none;

   font-family: 'Open Sans';
   font-size:17px;
   color: #000;

   &::placeholder { 
      color:#000;
   }
`

export const Error = styled.p`
   font-family: 'Open Sans';
   font-size:23px;
   color: red;
   margin-bottom:10px;
`

export const Next = styled.button`
   width: 50%;
   height: 64px;
   margin-top:20px;

   border-radius:15px;
   font-family: 'Open Sans';
   font-size:27px;
   background-color:#1e1e70;
   color: white;
`
