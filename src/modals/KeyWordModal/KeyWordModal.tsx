import styled from "styled-components";
import {InputKeyWord} from "../../components/UI/InputKeyWord/InputKeyWord";
import {Guess} from "../../components/UI/Buttons/Buttons";
import { WordBlocks } from "../../components/QuestionCard/WordBlocks";
import { useCallback, useState } from "react"
import {useMoralis} from 'react-moralis'
import {useGuess} from '../../hooks/guess'
import {useNotification} from 'web3uikit'

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

interface props{
    id: string;
    img: string;
    wordbroken: string;
    attempt_price: string;
    prize: number;
};

export const KeyWordModal = ({id, img, wordbroken, attempt_price, prize}: props) => {
    const {chainId, isWeb3Enabled} = useMoralis()
    const [wordInput, setWordInput] = useState<string>('')
    const guess = useGuess()
    const dispatchNotification = useNotification();

    const onChange = (e:any, isWhitespace:boolean, countInp:number) => {
        
        if(e.target.value === '') {
            let str: string | string[] = wordInput.split('')
            str.splice(countInp, 1)
            str = str.join('')
            setWordInput(str)
            return;
        }
        let strFirst = wordInput.slice(0,countInp); 
        let strLast = wordInput.slice(countInp);

        // console.log(strFirst + `${isWhitespace ? ' ' : ''}` + e.target.value + strLast)
		setWordInput(strFirst + `${isWhitespace ? ' ' : ''}` + e.target.value + strLast)
	}

    const submit = useCallback(async () => {
        if(!isWeb3Enabled) {
            dispatchNotification({
                type: 'error',
                message: 'Connect a wallet',
                title: 'Error',
                icon: "info",
                position:'topR',
            });
            return
        }

        if(chainId !== '0x4') { // rinkeby
            dispatchNotification({
                type: 'error',
                message: 'Switch to the rinkeby network',
                title: 'Error',
                icon: "info",
                position:'topR',
            });
            return
        }

        if(wordInput.length === 0) {
            dispatchNotification({
                type: 'error',
                message: 'Fill in the words field',
                title: 'Error',
                icon: "info",
                position:'topR',
            });
            return
        }

        await guess(String(id), Number(attempt_price), prize, wordInput, dispatchNotification)
    }, [
        wordInput, 
        isWeb3Enabled, 
        chainId, 
        attempt_price, 
        dispatchNotification, 
        guess, 
        id, 
        prize
    ])

    return(
        <CreateWordMessage>
            <img src={img} alt={''}/>
            <KeyWordWrapper>
                <WordBlocks 
                    onChange={onChange} 
                    disabled={false} 
                    wordbroken={wordbroken} 
                />
                
                <Guess onClick={submit}>
                    Guess
                </Guess>
            </KeyWordWrapper>
        </CreateWordMessage>
    );
};
