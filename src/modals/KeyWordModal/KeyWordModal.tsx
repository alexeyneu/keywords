import * as React from 'react';
import styled from "styled-components";
import {StaticImage} from "gatsby-plugin-image";
import {InputKeyWord} from "../../components/UI/InputKeyWord/InputKeyWord";
import {Guess} from "../../components/UI/Buttons/Buttons";


const CreateWordMessage = styled.div`
    max-width: 96.7rem;
    width: 100%;
    margin: auto;
  
  img{
    width: 371px;
  }
`

const KeyWordWrapper = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  
  div{
    margin: 2.4rem;
  }
`

export const KeyWordModal = () => {
    return(
        <CreateWordMessage>
            <StaticImage src={'../../images/bg_card.png'} alt={''}/>
            <KeyWordWrapper>
                <div>
                    <InputKeyWord value={'p'}/>
                    <InputKeyWord value={'h'}/>
                    <InputKeyWord value={'o'}/>
                    <InputKeyWord value={'t'}/>
                    <InputKeyWord value={'o'}/>
                </div>
                <div>
                    <InputKeyWord value={'w'}/>
                    <InputKeyWord value={'i'}/>
                    <InputKeyWord value={'t'}/>
                    <InputKeyWord value={'h'}/>
                </div>
                <div>
                    <InputKeyWord value={'f'}/>
                    <InputKeyWord value={'a'}/>
                    <InputKeyWord value={'m'}/>
                    <InputKeyWord value={'i'}/>
                    <InputKeyWord value={'l'}/>
                    <InputKeyWord value={'y'}/>
                </div>
                <Guess>
                    Guess
                </Guess>
            </KeyWordWrapper>
        </CreateWordMessage>
    );
};
