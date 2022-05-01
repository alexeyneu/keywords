import styled from "styled-components";

export const Container = styled.div`
   width: 100%;
   height: 100%;
   background: #84cdca;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`

export const ContainerQuestions = styled.div`
   width: 90%;
   height: 90%;
   background: #ffff;
   border-radius:50px;
   border: 2px solid #000;

   padding:40px;
   overflow: auto;
`

export const Questions = styled.div`
   width: 70%;
   min-height: 124px;

   margin:0 auto;
   margin-top:20px;

   background: #e27d5f;
   border-radius:20px;

   display: flex;
   justify-content: space-between;
   align-items: center;
   cursor: pointer;
`

export const QuestionsBlock = styled.div`
   width:50%;
   height:100%;
   padding:10px 20px;
   display: block;
`

export const QuestionsTitle = styled.h2`
   width:50%;
   overflow:hidden;
   font-family: 'Open Sans';
   color: white;
   font-size:20px;
   margin-top:5px;
`

export const BodyFilter = styled.div`
   width:50%;
   overflow:hidden;
   font-family: 'Open Sans';
   color: white;
   font-size:20px;
   margin-top:5px;
`

export const Filtertext = styled.div`
   color: black;
`