import styled from "styled-components";

import {Guess} from "../UI/Buttons/Buttons";
import {ShareButton} from "../ShareButton/ShareButton";
import ETH from '../../images/eth.png';
import {useCallback} from 'react'
import { WordBlocks } from "./WordBlocks";
import {useMoralis} from "react-moralis";

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
  background-color: #fff;

  @media(max-width: 755px){
    margin: 5rem 0 15rem 0;
  }

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
    top: 52rem;
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
  
  @media(max-width: 555px){
    display: none;
  }

  @media(max-width: 755px){
    left: 0;
    top: 100%;
  }

  p {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 2.6rem;
      font-weight: 600;
      margin: 0 1rem;
      
      display: flex;
      align-items: center;
      
      img{
        margin-left: 0.8rem;
      }
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

  @media(max-width: 555px){
    top: 3rem;
    z-index: 10;
  }
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

      display: flex;
      align-items: center;
      margin-left: 1.2rem;
      
      img{
        margin-left: 0.8rem;
      }
    }
  }
`

export const QuestionCard = ({question}: {question:any}) => {
  const {Moralis} = useMoralis();

  const prizePriceUsd = useCallback(async (ethPrize: number) => {
    let priceEth = await fetch('https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT');
    let priceEthJson = await priceEth.json() 
    
    console.log(Number(priceEthJson.price) * ethPrize)
    return Number(priceEthJson.price) * ethPrize
  }, [])

    return(
        <>
        {question.map((item:any) => {
          return(
            <Card key={item.id}>
                    <IdCardDiv className="id-card">
                        {item.attributes.ID}
                    </IdCardDiv>
                    <PriceCardDiv>
                    { typeof window !== 'undefined' ? window.innerWidth <= 555 ?
                            ''
                            :
                            <>
                                <p>Prize:
                                    <span>
                                {item.attributes.prize}
                                        <img style={{width: "2.4rem", height: "4rem"}} src={ETH} alt="eth"/>
                            </span>
                                </p>
                                {/* <span>({item.attributes.prizeUsd}$)</span> */}
                            </>
                        : null
                    }
                    </PriceCardDiv>
                    <ButtonsAction>
                        <Guess>
                            Guess
                        </Guess>
                    </ButtonsAction>
                    <SharedDiv>
                        <ShareButton/>
                    </SharedDiv>
                    <CardContext>
                        <ImageCard>
                            <img src={item.attributes.img} alt={'bg_card'}/>
                        </ImageCard>
                        <ImageCardDesc>
                            <h3>What is shown in the picture?</h3>
                            <p>Attempt cost:
                                <span>
                                    {Moralis.Units.FromWei(item.attributes.attempt_price)} {/* eth */}
                                    <img style={{width: "1.8rem", height: "3rem"}} src={ETH} alt="eth"/>
                                </span>
                            </p>
                            <p>Attempt made:
                                <span>
                                    {item.attributes.attempt}
                                </span>
                            </p>
                            { typeof window !== 'undefined'
                                ? window.innerWidth <= 555 ?
                                    <p>Prize:
                                        {/* <span>{item.attributes.prize}</span> ({item.attributes.prizeUsd})$)  */}
                                    </p>
                                    :
                                    ''
                                : null
                            }
                        </ImageCardDesc>
                    </CardContext>
                    <div style={{display: 'flex', flexWrap: "wrap"}}>
                        <WordBlocks wordbroken={item.attributes.wordbroken} />
                    </div>
                </Card>
          )
        }
        )}
        </>
    )
}
