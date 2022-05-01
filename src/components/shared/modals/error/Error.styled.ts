import styled from "styled-components";
import {BodyBG} from '../../UI/Modals'

export const ErrorModalUI = styled.div`
   position: relative;
   top:60px;

   width: 60%;
   height: 20%;
   background-color: #fff;
   border-radius:30px;
   margin:0 auto;
`

const Header = styled.div`
   position: relative;
   width:90%;
   height:64px;
   margin: 0 auto;

   display: flex;
   align-items: center;
   justify-content: space-between;
`

export const ErrorBg = styled(BodyBG)`
   z-index: 10002;
`

export const GuessedModal = styled.div`
   position: relative;
   top:60px;

   width: 60%;
   height: 30%;
   background-color: #fff;
   border-radius:30px;
`

export const ErrorHeader = styled(Header)`
   height:40px;
`

export const Error = styled.p`
   color: #cc0000c7;
   font-family: 'Open Sans';
   font-size:25px;
   width:100%;
   
   margin-top:30px;
   text-align:center;
`