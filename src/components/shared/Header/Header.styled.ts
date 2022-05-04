import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Header = styled.header`
   width: 100%;
   background: rgb(255, 255, 255);
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-family: Roboto, sans-serif;
   border-bottom: 2px solid rgba(0, 0, 0, 0.06);
   padding: 0px 10px;
   box-shadow: rgb(151 164 175 / 10%) 0px 1px 10px;
   height: 64px;
   color: rgba(0, 0, 0, 0.85);
`

export const PaginationPanel = styled.ul`
   height: 100%;
   width: 100%;
   display: flex;
   align-items: center;
   font-size: 17px;
   font-weight: 500;
   margin-left: 50px;
   line-height: inherit;
   list-style: none;
`

export const Title = styled(Link)`
   margin: 0 20px;
   font-family: Roboto, sans-serif;
   font-size: 22px;
   font-weight: 600;
   vertical-align: bottom;
   white-space: nowrap;
   background:white;
   color:rgba(0, 0, 0, 0.85);
   text-decoration: none;
`

export const PaginationPages = styled(Link).attrs((props:{isPages:boolean;}) => props)`
   height: 50%;
   margin: 0 40px;
   margin-left: auto;
   font-family: Roboto, sans-serif;
   font-size: 19px;
   font-weight: 600;
   opacity: 1;
   order: 0;
   position: relative;
   top: 5px;
   display: inline-block;
   vertical-align: bottom;
   white-space: nowrap;
   cursor: pointer;
   flex: none;
   color:${props => props.isPages ? '#21bf96' : 'rgba(0, 0, 0, 0.85)'};
   text-decoration: none;
   border-bottom: 2px solid ${props => props.isPages ? '#21bf96' : 'white'};

   &:hover {
      color:#21bf96;
      border-bottom:2px solid #21bf96;
   }
   transition: border-color 0.3s, color 0.3s;
`

export const WithdrawalBtn = styled.button`
   height: 50%;
   margin: 0 20px;
   font-family: Roboto, sans-serif;
   font-size: 19px;
   font-weight: 600;
   opacity: 1;
   order: 0;
   position: relative;
   top: 1px;
   display: inline-block;
   vertical-align: bottom;
   white-space: nowrap;
   cursor: pointer;
   flex: none;
   padding: 0 10px;
   border-radius: 12px;
   height:50%;
`

export const BalanceText = styled.p`
   margin: 0 20px;
   font-family: Roboto, sans-serif;
   font-size: 19px;
   font-weight: 600;
   display: inline-block;
   vertical-align: bottom;
   white-space: nowrap;
   background:white;
`

export const Authenticate = styled.button`
   font-family: Roboto, sans-serif;
   font-size: 17px;
   font-weight: 600;
   padding: 0px 15px;
   display: flex;
   justify-content: center;
   align-items: center;
   width: fit-content;
   border-radius: 12px;
   background-color: rgb(244, 244, 244);
   cursor: pointer;
   color:#21bf96;
   height:50%;
`



