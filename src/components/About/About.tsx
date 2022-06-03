import * as React from 'react';
import styled from "styled-components";
import {StaticImage} from "gatsby-plugin-image";
import {Container} from "../Container/Container";
import aboutIMG from '../../images/about.png';

export const About = () => {

    const DivFlex = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
      
      @media(max-width: 937px){
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `

    const TextDescriptionAbout = styled.div`
        max-width: 65.3rem;
      
      h4{
        font-size: 3.2rem;
        margin: 0 0 5rem 0;
      }
      p{
        line-height: 25px;
      }
    `

    return(
        <section style={{paddingBottom:"15rem"}}>
                <DivFlex>
                    <img
                        style={{
                            maxWidth:"49.1rem",
                            width:"100%",
                            maxHeight: "39.6rem",
                            height:"auto"}}
                        src={aboutIMG}
                        alt={'about'}
                    />
                    <TextDescriptionAbout>
                        <h4>About</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor http//loremagnaaliqua et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat.</p>
                    </TextDescriptionAbout>
                </DivFlex>
        </section>
    )
}
