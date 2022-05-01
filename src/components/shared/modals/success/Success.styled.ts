import styled from "styled-components";
import {BodyBG} from '../../UI/Modals'

export const SuccessModalUI = styled.div`
   position: relative;
   top:60px;

   width: 60%;
   height: 20%;
   background-color: #fff;
   border-radius:30px;
   margin: 0 auto;
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

export const SuccessBg = styled(BodyBG)`
   z-index: 10003;
`

export const GuessedModal = styled.div`
   position: relative;
   top:60px;

   width: 60%;
   height: 30%;
   background-color: #fff;
   border-radius:30px;
   margin:0 auto;
`

export const SuccessHeader = styled(Header)`
   height:40px;
`

export const Success = styled.p`
   color: rgb(33,191,150);
   font-family: 'Open Sans';
   font-size:30px;
   width:100%;
   
   margin-top:20px;
   text-align:center;
`