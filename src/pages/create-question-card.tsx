import * as React from "react"
import GlobalStyled from '../styles/GlobalStyles'
import {Header} from "../components/Header/Header";
import {Footer} from "../components/Footer/Footer";
import {Container} from "../components/Container/Container";
import styled from "styled-components";
import {Input} from "../components/UI/Input/Input";
import {ActionButton, Guess} from "../components/UI/Buttons/Buttons";
import {LayoutQuestionCard} from "../components/LayoutQuestionCard/LayoutQuestonCard";
import {StaticImage} from "gatsby-plugin-image";
import {motion} from "framer-motion";
import BG_LIGHT_GROUP from '../images/group-light-bg.png';
import {UseMatchMedia} from '../hooks/use-match-media';
import {HeaderMobile} from "../components/Header/HeaderMobile";

const ContentCreateWord = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  
  @media(max-width: 813px){
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const StepsCreateWord = styled.div`
    
    
`

const Inputs = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    margin-bottom: 4.8rem;
  
  @media(max-width: 560px){
    flex-direction: column;
    align-items: flex-start;
  }
  
      div{
        p{
          font-weight: 600;
          margin-bottom: 1.6rem;
        }
      }
`

const GeneratedPicture = styled.div`
    max-width: 52.4rem;
    padding: 0 2rem;
    width: 100%;
    
  p{
    font-weight: 600;
    margin-bottom: 1.6rem;
  }
`

const CreateQuestionCard = () => {
    const {isMobile} : any = UseMatchMedia();
    return(
        <motion.div
            initial={{opacity: "0", y: "-1500px"}}
            animate={{opacity: "1", y: '0'}}
            exit={{opacity: "0", y: "-1500px"}}
            transition={{type: 'spring', duraction: 1.5, bounce: 0.3}}
        >
        <main style={{position: 'relative'}}>
            {isMobile ? <HeaderMobile/> : <Header/>}
            <Container>
                <h1 style={{textAlign: "center", fontSize: "3.2rem", margin: '3rem 0 7.2rem 0'}}>Create a keyword</h1>
                <img
                    style={{position: "absolute", zIndex: '-1', top: '10%', right: "0", width: "1200px"}}
                    src={BG_LIGHT_GROUP}
                    alt="Group Light"
                />
                <ContentCreateWord>
                    <StepsCreateWord>
                        <div style={{maxWidth: "57rem"}}>
                            <h4 style={{marginBottom: "2.4rem"}}>1. Enter the word</h4>
                            <p style={{marginBottom: "3.6rem"}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et http//loremagnaaliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <Input style={{marginBottom: "4.8rem"}} placeholder={'Enter the word'}/>
                            <ActionButton>
                                Generate
                            </ActionButton>
                        </div>
                        <div style={{maxWidth: "57rem", margin: "7.2rem 0"}}>
                            <h4 style={{marginBottom: "2.4rem"}}>2. Presents</h4>
                            <p style={{marginBottom: "3.6rem"}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et http//loremagnaaliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <Inputs>
                                <div style={{maxWidth: '260px'}}>
                                    <p>Presents</p>
                                    <Input placeholder={'ETH'}/>
                                </div>
                                <div style={{maxWidth: '260px'}}>
                                    <p>Coast of try</p>
                                    <Input placeholder={'ETH'}/>
                                </div>
                            </Inputs>
                            <ActionButton>
                                Preview
                            </ActionButton>
                        </div>
                    </StepsCreateWord>
                    <GeneratedPicture>
                        <p>Generated picture</p>
                        <StaticImage src={'../images/bg_card.png'} alt={'generate-img'}/>
                    </GeneratedPicture>
                </ContentCreateWord>
                <div style={{margin: "0 0"}}>
                    <h4 style={{marginBottom: "2.4rem"}}>3. Preview</h4>
                    <LayoutQuestionCard/>
                </div>
                <div style={{textAlign: "center"}}>
                    <Guess>
                        Publish
                    </Guess>
                </div>
                <Footer/>
            </Container>
            <GlobalStyled/>
        </main>
            </motion.div>
    )
}

export default CreateQuestionCard;
