import styled from "styled-components";
import {Guess} from "../../components/UI/Buttons/Buttons";
import { WordBlocks } from "../../components/QuestionCard/WordBlocks";
import { useCallback, useState } from "react"
import {useMoralis} from 'react-moralis'
import {useGuess} from '../../hooks/guess'
import {useNotification} from 'web3uikit'
import { ModalsBackground } from "../modals-background";
import { CorrectAnswer } from "../CorrectAnswer/CorrectAnswer";
import { WalletMessageModal } from "../WalletMessageModal/WalletMessageModal";
import { ChangeNetWork } from "../ChangeNetWork/ChangeNetWork";
import { InCorrectAnswer } from "../InCorrectAnswer/InCorrectAnswer";
import {wordValid} from '../../shared/variable'
import * as yup from 'yup';

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
  margin-bottom: 25px;
  
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
    const dispatchNotification = useNotification();
    const [status, setStatus] = useState<string | number>('')
    const guess = useGuess(id, prize, setStatus)

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
            setStatus('connect wallet')
            return
        }

        if(chainId !== '0x4') { // rinkeby
            setStatus('change network')
            return;
        }

        if(wordInput.length === 0) {
            dispatchNotification({
                type: 'error',
                message: 'Fill in the words field',
                title: 'Error',
                icon: "info",
                position:'topR',
            });
            return;
        }
        const validScheme = yup.object().shape({
            word:wordValid,
        })
        const isValid = await validScheme.isValid({
            word: wordInput
        })

        if(!isValid) {
            dispatchNotification({
                type: 'error',
                message: 'While entering the text, only use latin letters [a-z].' +
                    ' Without commas and other punctuation signs. Maximum word count is 5',
                title: 'Error',
                icon: "info",
                position:'topR',
            });

            return;
        }

        // setStatus('wainting')
        // await guess(String(id), Number(attempt_price), wordInput)
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
        <>
        {status === 'change network' &&
            <ModalsBackground onClick={() => setStatus('')}>
                <ChangeNetWork setStatus={setStatus} />
            </ModalsBackground>
        }

        {status === 'connect wallet' &&
            <ModalsBackground onClick={() => setStatus(' ')}>
                <WalletMessageModal setStatus={setStatus} />
            </ModalsBackground>
        }

        {/* модалка выйграша */}
        {typeof status === 'number' &&
            <ModalsBackground onClick={() => setStatus(' ')}>
                <CorrectAnswer prize={status}/>
            </ModalsBackground>
        }

        {/* модалка пройгрыша */}
        {status === "You didn't guess" &&
            <ModalsBackground onClick={() => setStatus(' ')}>
                <InCorrectAnswer onClick={() => setStatus(' ')} />
            </ModalsBackground>
        }

        {/* модалка ожидания */}
        {status === "wainting" &&
            <ModalsBackground onClick={() => setStatus(' ')}>
                <div style={{"color": "white"}} ></div>
            </ModalsBackground>
        }

        <CreateWordMessage>
            <img src={img} alt={''}/>
            <KeyWordWrapper>
                <WordBlocks
                    onChange={onChange}
                    disabled={false}
                    wordbroken={wordbroken}
                />
            </KeyWordWrapper>
            <Guess onClick={submit}>
                Guess
            </Guess>
        </CreateWordMessage>
        </>
    );
};
