import * as React from 'react';
import mainIMG from '../../images/man.png';
import {Container} from "../Container/Container";
import styled from "styled-components";
import {StaticImage} from "gatsby-plugin-image";

const mainImgStyle = {
    width: '67rem',
    height: '65.3rem',
    Position: 'relative',
}

const HeaderH1 = styled.h1`
  font-size: 8.5rem;
  background: linear-gradient(90deg, #57B8AC 0%, #5DE8D6 18.16%, #4381F9 45.27%, #A532F8 72.84%, #F292CD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  font-family: "Arial Rounded Bold", sans-serif;
  letter-spacing: 10px;
`

const HeaderDescription = styled.p`
    color: #FF9E00;
    font-size: 3.6rem;
    font-weight: 600;
    text-transform: uppercase;
    margin: 2rem 0 2rem 0;
    letter-spacing: 10px;
      
      span{
        color: #7857F9;
      }
`

const DivFlex = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  
    position: relative;
`

export const KeywordBanner = () => {
    return(
        <section style={{padding:"100px 0"}}>
            <Container>
                <DivFlex>
                    <div style={{marginTop:"7.5rem", position:"absolute", top:'0', left:"2rem", zIndex:"1"}}>
                        <HeaderH1>keywords</HeaderH1>
                        <HeaderDescription>blockchain <span>game</span></HeaderDescription>
                    </div>
                    <div>
                        <StaticImage style={mainImgStyle} src={'../../images/man.png'} alt={'main_img'}/>
                    </div>
                </DivFlex>
            </Container>
        </section>
    );
}
