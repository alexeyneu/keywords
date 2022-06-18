import * as React from 'react';
import styled from "styled-components";
import {InputKeyWord} from "../../components/UI/InputKeyWord/InputKeyWord";
import {Guess} from "../../components/UI/Buttons/Buttons";


const CreateWordMessage = styled.div`
    max-width: 96.7rem;
    width: 100%;
    margin: auto;
    padding-top: 5rem;
  
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
            <img src={'../../images/bg_card.png'} alt={''}/>
            <KeyWordWrapper>
                <div>
                    <InputKeyWord margin={"0"} value={'p'}/>
                    <InputKeyWord margin={"0"} value={'h'}/>
                    <InputKeyWord margin={"0"} value={'o'}/>
                    <InputKeyWord margin={"0"} value={'t'}/>
                    <InputKeyWord margin={"0"} value={'o'}/>
                </div>
                <div>
                    <InputKeyWord margin={"0"} value={'w'}/>
                    <InputKeyWord margin={"0"} value={'i'}/>
                    <InputKeyWord margin={"0"} value={'t'}/>
                    <InputKeyWord margin={"0"} value={'h'}/>
                </div>
                <div>
                    <InputKeyWord margin={"0"} value={'f'}/>
                    <InputKeyWord margin={"0"} value={'a'}/>
                    <InputKeyWord margin={"0"} value={'m'}/>
                    <InputKeyWord margin={"0"} value={'i'}/>
                    <InputKeyWord margin={"0"} value={'l'}/>
                    <InputKeyWord margin={"0"} value={'y'}/>
                </div>
                <Guess>
                    Guess
                </Guess>
            </KeyWordWrapper>
        </CreateWordMessage>
    );
};
