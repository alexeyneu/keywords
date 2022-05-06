import styled from "styled-components";

export const Container = styled.div`
   max-width: 1440px;
   height: 100%;
   padding:40px;

   display: flex;
   flex-direction: column;
   margin:0 auto;
`

export const AboutTitle = styled.h1`
   font-family: Roboto, sans-serif;
   font-size: 33px;
   font-weight: 700;
`

export const AboutText = styled.p`
   max-width:90%;
   font-family: Roboto, sans-serif;
   font-size: 20px;
   font-weight: 500;
   margin-top:40px;
`

export const BodyFilter = styled.div`
   width:100%;
   margin-top:60px;
   display:flex;
   justify-content: space-between;
`

export const FilterType = styled.div`
   display:flex;
`

export const FilterTypeTitle = styled.p`
   color: black;
   font-family: Roboto, sans-serif;
   font-size: 20px;
   margin-right:7px;
`

export const Filtertext = styled.div.attrs((props: {isChecked: boolean}) => props)`
   color:${props => props.isChecked ? ' #3da6f1' : '#7a23eb'};
   font-family: Roboto, sans-serif;
   font-size: 20px;
   cursor: pointer;
   margin-left:5px;
`

export const ContainerQuestions = styled.div`
   width:90%;
   margin-top:20px;
   margin:0 auto;
`

export const Questions = styled.div`
   width: 100%;
   margin:0 auto;
   margin-top:50px;

   display: flex;
   justify-content: space-between;
`

export const QuestionsPrev = styled.img`
   width: 35%;
   height: 100%;
`

export const QuestionsInfo = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`

export const QuestionsHeader = styled.header`
   width: 100%;
   padding:0 20px;
   display: flex;
   justify-content: space-between;
`

export const QuestionsHeaderText = styled.h3`
   font-family: Roboto, sans-serif;
   font-size: 22px;
   font-weight: 500;
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
   font-size:22px;
   margin-top:5px;
`

export const GuessBtn = styled.button`
   width:130px;
   height:40px;
   border:none;
   border-radius:5px;
   font-family: 'Open Sans';
   color: white;
   font-size:22px;
   background:#1e1e70;
   margin-left:auto;
   margin-right:100px;
   margin-top:20px;
   cursor:pointer;
`

export const Info = styled.div`
   margin-top:auto;
   margin-left:40px;
`

export const InfoText = styled.div`
   font-family: 'Open Sans';
   color: black;
   font-size:20px;
`

export const BlockWordFlex = styled.div`
   display:flex;
   margin-top:10px;
`

export const BlockWord = styled.div`
   border:1px solid #000;
   border-top:2px solid #000;
   border-bottom:2px solid #000;
   width:40px;
   height:40px;
`

export const BlockNewWord = styled(BlockWord)`
   margin-left:10px;
`