import styled from "styled-components";

export const Header = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color:#e27d5f;
   box-shadow: rgb(151 164 175 / 10%) 0px 1px 10px;
   padding:0 30px;
   z-index: 1;
   width: 100%;
   height: 64px;
`

export const HeaderBodys = styled.div`
   display: flex;
   align-items: center;
   width: 50%;
   height: 100%;
`

export const HeaderConnect = styled.div`
   height: 42px;
   padding: 0px 15px;
   display: flex;
   justify-content: center;
   align-items: center;
   width: fit-content;
   border-radius: 12px;
   background-color: rgb(244, 244, 244);
   cursor: pointer;
   margin: 0 0 0 auto;
   color: rgb(33, 191, 150);
`

export const HeaderBalance = styled.div`
   text-align: center;
   white-space: nowrap;
   font-size: 20px;
   font-weight: 600;
   margin: 0 0 0 auto;
   color: rgb(255, 255, 255);
`