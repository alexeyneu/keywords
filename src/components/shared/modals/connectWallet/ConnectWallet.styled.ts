import styled from "styled-components";
import {
   BodyBG
} from '../../UI/Modals'

export const ModalWrap = styled(BodyBG)`
   z-index:10999;
   position: fixed;
   display: flex;
   justify-content: center;
`

export const ConnectModalUI = styled.div`
   position: absolute;
   z-index:10001;
   color: rgba(0,0,0,.85);
   font-variant: tabular-nums;
   line-height: 1.5715;
   list-style: none;
   font-feature-settings: "tnum","tnum";
   top: 100px;
   max-width: calc(100vw - 32px);
   padding: 0 0 24px;

   font-size: 16px;
   font-weight: 500;
   width: 340px;
   height: 505px;
   transform-origin: 751.5px -64px;
   background-color: #fff;
   overflow: auto;
   border-radius: 1rem;
`

export const DeleateModal = styled.button`
   cursor:pointer;
   position: absolute;
   top: 0;
   right: 0;
   z-index: 10010;
   padding: 0;
   color: rgba(0,0,0,.45);
   font-weight: 700;
   line-height: 1;
   text-decoration: none;
   background: transparent;
   border: 0;
   outline: 0;
   cursor: pointer;
   transition: color .3s;
`

export const DeleateClose = styled.span`
   display: block;
   width: 56px;
   height: 56px;
   font-size: 16px;
   font-style: normal;
   line-height: 56px;
   text-align: center;
   text-transform: none;
   text-rendering: auto;
   cursor: pointer;
`

export const ModalContent = styled.div`
   padding: 15px;
   font-size: 17px;
   font-weight: 500;
   line-height: 1.5715;
   word-wrap: break-word;
`

export const ConnectTitle = styled.h2`
   padding: 10px;
   display: flex;
   justify-content: center;
   color: rgba(0,0,0,.85);
   font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
   font-weight: 700;
   font-size: 20px;
`

export const ConnectorsBody = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
`

export const Connector = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   height: auto;
   justify-content: center;
   margin-left: auto;
   margin-right: auto;
   padding: 20px 5px;
   cursor: pointer;
`

export const ConnectorText = styled.span`
   font-size: 14px;
   font-weight: 500;
   color: rgba(0,0,0,.85);
   overflow-wrap: break-word;
   cursor: pointer;
   font-variant: tabular-nums;
   font-feature-settings: "tnum","tnum";
   font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
`

export const ConnectorImg = styled.img`
   align-self: center;
   fill: rgb(40, 13, 95);
   flex-shrink: 0;
   margin-bottom: 8px;
   height: 30px;
   max-width: 100%;
   display: block;
   vertical-align: middle;
   border-style: none;
`