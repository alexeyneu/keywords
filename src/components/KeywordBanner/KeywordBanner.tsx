import {Container} from "../Container/Container";
import styled from "styled-components";
import {useState} from "react";
import Man from '../../images/man.png';
import { ModalsBackground } from '../../modals/modals-background';
import { VideoModal } from '../../modals/VideoModal/VideoModal';

const ImgMan = styled.img`
    max-width: 80rem;
    width: 100%;
    max-height: 65.3rem;
    height: 100%;
    position: relative;
  margin-left: 40rem;
  
  @media(max-width: 555px){
    width: 60rem;
    margin-left: 0;
  }
`

const HeaderH1 = styled.h1`
  font-size: 8.5rem;
  background: linear-gradient(90deg, #57B8AC 0%, #5DE8D6 18.16%, #4381F9 45.27%, #A532F8 72.84%, #F292CD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  font-family: "Arial Rounded Bold", sans-serif;
  letter-spacing: 10px;
  
  @media(max-width: 570px){
    font-size: 5rem;
  }
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

  @media(max-width: 570px){
    font-size: 2rem;
  }
`

const DivFlex = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  
    position: relative;
    padding-bottom: 10rem;

  @media(max-width: 556px){
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
  }
`

const PlayVideo = styled.button`
    width: 100px;
    height: 100px;
    background-color: #6A34FF;
    
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: none;
    font-size: 4rem;
    color: #fff;
    margin: 0 auto;
`

const HeaderText = styled.div`
    margin-top: 7.5rem;
    position: absolute;,
    top: 0;
    left: 0;
    z-index: 1;
  
  @media(max-width: 556px){
    position: inherit;
  }
`

export const KeywordBanner = () => {

    const [isActiveVideo, setIsActiveVideo] = useState(false);

    return(
        <section style={{padding:"50px 0"}}>
            <Container>
                <DivFlex>
                    <HeaderText>
                        <HeaderH1>keywords</HeaderH1>
                        <HeaderDescription>blockchain <span>game</span></HeaderDescription>
                        <PlayVideo onClick={() => setIsActiveVideo(!isActiveVideo)}>
                            ▶
                        </PlayVideo>
                    </HeaderText>
                    <div>
                        <ImgMan src={Man} alt={'main_img'}/>
                    </div>
                </DivFlex>
            </Container>
            { isActiveVideo ?
                <ModalsBackground>
                    <br/>
                    <VideoModal/>
                </ModalsBackground>
                : '' }
        </section>
    );
}
