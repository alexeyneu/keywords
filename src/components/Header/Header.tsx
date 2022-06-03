import * as React from 'react';
import styled from "styled-components";
import {Container} from "../Container/Container";
import {ActionButton, WidthDrawlButton} from "../UI/Buttons/Buttons";
import {CircleIconButton} from "../UI/CircleIconButton/CircleIconButton";
import {StaticImage} from "gatsby-plugin-image";
import BG_LIGHT from '../../images/light-bg.png'
import {KeywordBanner} from "../KeywordBanner/KeywordBanner";
import {About} from "../About/About";
import {ListFilter} from "../ListFilter/ListFilter";


export const Header = () => {

    const TITLE_HEADER: string | null = 'Keywords.games'

    const TitleHeader = styled.p`
        font-size: 3.2rem;
        font-weight: 600;
    `

    const DivFlex = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
      
        position: relative;
        z-index: 2;
      
        @media (max-width: 972px){
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
    `;

    const Header = styled.header`
        padding: 4.2rem 0;
        position: relative;
    `;

    const BgLightStatic = styled.img`
      position: absolute;
      z-index: 1;
      right: 0;
      top: 0;
      width: 52.7rem;
      height: 52.7rem;
    `

    const DetailAccount = styled.div`
      display: flex;
      align-items: center;

      @media (max-width: 972px){
        margin: 2rem 0;
      }
      
      @media (max-width: 630px){
        flex-direction: column;
        align-items: center;
      }
      
      & button:not(:last-child){
        margin: 0 2.4rem 0 0;

        @media (max-width: 630px){
          margin: 2.4rem 0 1.4rem 0;;
        }
      }

      & p {
        font-size: 2.4rem;
        font-weight: 600;
        margin: 0 2.4rem;
        text-align: center;

        & span {
          color: rgba(0, 0, 0, 0.4);
        }
      }
    `;

    return(
        <Header>
            <BgLightStatic src={BG_LIGHT} alt={'bg-light'}/>
            <Container>
                <DivFlex>
                    <TitleHeader>{TITLE_HEADER}</TitleHeader>
                    <DetailAccount>
                        <p>0 <span>ETH</span></p>
                        <ActionButton>
                            Keyword creat
                        </ActionButton>
                        <WidthDrawlButton>
                            Widthdrawl of money
                        </WidthDrawlButton>
                        <CircleIconButton>
                            <StaticImage src={"../../images/wallet-icon.png"} alt={"wallet"}/>
                        </CircleIconButton>
                    </DetailAccount>
                </DivFlex>
            </Container>
        </Header>
    )
}
