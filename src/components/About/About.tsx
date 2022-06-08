import * as React from 'react';
import styled from "styled-components";
import Light from '../../images/light.png';

export const About = () => {

    const DivFlex = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
    `

    const TextDescriptionAbout = styled.div`
        width: 100%;
      
      h4{
        font-size: 3.2rem;
        margin: 0 0 5rem 0;
        text-align: center;
      }
      p{
        line-height: 25px;
      }
    `

    return(
        <section style={{paddingBottom:"15rem", position: "relative"}}>
            <img
                style={{position: "absolute", left: "-25%", top: "-100%", zIndex: '0', width: "1100px"}}
                src={Light}
                alt={'light'}
            />
                <DivFlex>
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
