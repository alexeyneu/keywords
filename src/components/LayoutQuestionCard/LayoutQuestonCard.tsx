import * as React from 'react';
import styled from "styled-components";
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";
import BG_CARD from '../../images/bg_card.png'
import {InputKeyWord} from "../UI/InputKeyWord/InputKeyWord";
import {Guess} from "../UI/Buttons/Buttons";
import {ShareButton} from "../ShareButton/ShareButton";
import {useState} from "react";
import {ShareLinks} from "../ShareLinks/ShareLinks";

const CardContext = styled.div`
    display: flex;

  @media(max-width: 755px){
    margin: 0 0 4rem 0 ;
  }
  
  @media(max-width: 577px){
    flex-direction: column;
    padding: 7rem 0;
  }
`

const Card = styled.div`
    width: 100%;
    min-height: 34.3rem;
    height: auto;
    position: relative;
    box-shadow: 0px 0.4rem 3.6rem 1.2rem rgba(0, 0, 0, 0.04);
    border-radius: 2.4rem;
    padding: 3.6rem 3.6rem 3.6rem 9.5rem;
    margin: 5rem 0;

  @media(max-width: 577px){
    padding: 3.6rem;
  }
`

const IdCardDiv = styled.div`
  position: absolute;
  left: 0;
  top: 3.6rem;
  background: #d9d9d9;
  border-radius: 0rem 1.6rem 1.6rem 0rem;
  width: 7.9rem;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.4rem;
`

const ButtonsAction = styled.div`
    position: absolute;
    right: 5rem;
    top: 17.0rem;

  @media(max-width: 755px){
    right: 10%;
    top: 30rem;
  }
  
  @media(max-width: 577px){
    top: 48rem;
    left: 5rem;
  }
`
const PriceCardDiv = styled.div`
  position: absolute;
  right: 5rem;
  top: 0;
  background-color: #f1f1f1;
  border-radius: 0rem 0rem 1.6rem 1.6rem;
  box-shadow: 5px 4px 24px rgba(227, 227, 234, 0.5), inset 8px -6px 12px rgba(207, 207, 221, 0.6);
  width: 20.9rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media(max-width: 755px){
    right: 30%;
    top: 100%;
  }

  p {
    font-size: 18px;

    span {
      font-size: 26px;
      font-weight: 500;
      margin: 0 1rem;
    }
  }

  span:nth-child(2) {
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.5);

    margin: 1.2rem 0;
  }
`

const ImageCard = styled.div`
    max-width: 38.3rem;
    width: 100%;
    max-height: 20.7rem;
    height: auto;
    margin: 0 3.6rem 2.4rem 0;
  
  img{
    width: 100%;
    height: 100%;
  }
`

const SharedDiv = styled.div`
    position: absolute;
    right: 5rem;
    bottom: 2rem;

`

const ImageCardDesc = styled.div`
  margin: 0 25rem 0 0 ;

  @media(max-width: 755px){
    margin: 0 0rem 0 0 ;
  }

  h3 {
    margin-bottom: 3.3rem;
  }

  p {
    margin-bottom: 2.1rem;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-wrap: wrap;
    
      span{
        font-size: 20px;
        color: #000000;
        font-weight: 600;
      }
  }
`

export const LayoutQuestionCard = () => {

    const [isActiveSharedLinks, setIsActiveSharedLinks] = useState(false);

    return(
        <>
                <Card>
                    <IdCardDiv className="id-card">
                        1
                    </IdCardDiv>
                    <PriceCardDiv>
                        <p>Prize:
                            <span>
                            0,0001
                        </span>
                        </p>
                        <span>(200$)</span>
                    </PriceCardDiv>
                    <ButtonsAction>
                        <Guess>
                            Guess
                        </Guess>
                    </ButtonsAction>
                    <SharedDiv>
                        <ShareButton onClick={() => setIsActiveSharedLinks(!isActiveSharedLinks)}/>
                        <div style={{position: "absolute", right: "35%", top: "100%"}}>
                            {isActiveSharedLinks ? <ShareLinks/> : ''}
                        </div>
                    </SharedDiv>
                    <CardContext>
                        <ImageCard>
                            <StaticImage src={'../../images/bg_card.png'} alt={'bg_card'}/>
                        </ImageCard>
                        <ImageCardDesc>
                            <h3>What is shown in the picture?</h3>
                            <p>Attempt cost:
                                <span>
                                0,0001
                            </span>
                            </p>
                            <p>Attempt made:
                                <span>
                                10
                            </span>
                            </p>
                        </ImageCardDesc>
                    </CardContext>
                    <div style={{display: 'flex', flexWrap: "wrap"}}>
                        <div style={{margin: "1.6rem"}}>
                            <InputKeyWord/>
                            <InputKeyWord/>
                            <InputKeyWord/>
                            <InputKeyWord/>
                        </div>
                        <div style={{margin: "1.6rem"}}>
                            <InputKeyWord/>
                            <InputKeyWord/>
                        </div>
                        <div style={{margin: "1.6rem"}}>
                            <InputKeyWord/>
                            <InputKeyWord/>
                            <InputKeyWord/>
                            <InputKeyWord/>
                            <InputKeyWord/>
                        </div>
                    </div>
                </Card>
        </>
    )
}
