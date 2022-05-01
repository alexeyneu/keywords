import styled from "styled-components";

export const BodyBG = styled.div`
   position: absolute;
   justify-content: center;
   background-color: rgba(0,0,0,.472);
   height: 100%;
   width: 100%;
   z-index: 10000;
`

export const DeleateModalBody = styled.div`
   position: absolute;
   z-index: 10000;
   top:10px;
   right:15px;

   @media (max-width:380px) {
      top:18px;
   }
`

export const DeleateModal = styled.button`
   box-sizing: content-box;
   width: 2em;
   height: 2em;
   padding: 0.25em 0.25em;
   color: #000;
   border: 0;
   border-radius: 0.25rem;
   opacity: .8;
   cursor: pointer;
   background-color:#00000075;   
`