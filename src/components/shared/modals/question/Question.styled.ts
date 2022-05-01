import styled from "styled-components";

export const Body = styled.div`
   width:70%;
   height:80%;

   background-color: #e27d5f;
   border-radius: 20px;
   box-sizing: border-box;
   color: #ffff;
   font-family: DM Sans;
   font-size: 23px;
   font-style: normal;
   font-weight: 700;
   line-height: 30px;
   padding: 20px 10px;
   position: relative;
   text-align: center;
   top: 50px;
   z-index: 10001;
   margin:0 auto;
`

export const Header = styled.div`
   position: relative;
   width:90%;
   height:64px;
   margin: 0 auto;

   display: flex;
   align-items: center;
   justify-content: space-between;
`

export const Title = styled.h2`
   font-family: 'Open Sans';
   color: white;
   font-size:20px;
`

export const TextInfo = styled.h2`
   font-family: 'Open Sans';
   color: white;
   font-size:20px;
   margin:10px 0;
`

export const Img = styled.img`
   width:300px;
   height:300px;
`

export const Next = styled.button`
   width: 40%;
   height: 64px;

   position: absolute;
   bottom: 20px;
   left: 50%;
   transform: translate(-50%, 0);

   border-radius:15px;
   font-family: 'Open Sans';
   font-size:27px;
   color: #e27d5f;
`



