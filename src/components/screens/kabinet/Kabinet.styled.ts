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

export const Body = styled.div`
   width: 600px;
   height: 500px;
   padding-top:20px;

   background: #e8a87c;
   border-radius:10px;
`

export const BodyChange = styled.div`
   width: 80%;
   height: 64px;
   margin:0 auto;
   background: #e27d5f;

   display: flex;
   align-items: center;
   justify-content: space-between;
`

export const ChangeBtn = styled.button.attrs((props: {change: boolean}) => props)`
   width: 50%;
   height: 100%;

   background: ${props => props.change ? '#c38d9d' : '#e27d5f'};

   font-family: 'Open Sans';
   color: white;
   font-size:25px;
`

export const BodyAccount = styled.div`
   width: 80%;
   height: 100%;
   padding-top:30px;

   margin:0 auto;
   display: flex;
   flex-direction: column;
   align-items: center;
`

export const Title = styled.p`
   width: 80%;
   overflow: hidden;
   margin-bottom:20px;

   font-family: 'Open Sans';
   color: white;
   font-size:30px;
`

export const ChangeEvent = styled.button`
   width: 70%;
   height: 50px;
   margin-top:10px;

   background:#84cdca;
   border-radius:20px;

   font-family: 'Open Sans';
   color: white;
   font-size:20px;
`