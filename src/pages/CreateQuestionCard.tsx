import GlobalStyled from '../styles/GlobalStyles'
import {Header} from "../components/Header/Header";
import {Footer} from "../components/Footer/Footer";
import {Container} from "../components/Container/Container";
import styled from "styled-components";
import {Input} from "../components/UI/Input/Input";
import {ActionButton} from "../components/UI/Buttons/Buttons";
import {LayoutQuestionCard} from "../components/LayoutQuestionCard/LayoutQuestonCard";
// import {motion} from "framer-motion";
import BG_LIGHT_GROUP from '../images/group-light-bg.png';
import {HeaderMobile} from "../components/Header/HeaderMobile";
import bgCard from '../images/bg_card.png';

import {Form, Formik} from 'formik'
import * as yup from 'yup';
import { useEffect, useMemo, useState } from 'react'
import { 
    useMoralisFile, 
    useNewMoralisObject, 
    useMoralis,
} from "react-moralis";
import {urlImg} from '../shared/urls/urls'
import {wordValid} from '../shared/variable'

import {useSafeMint} from '../hooks/mint'
import {useImageFee} from '../hooks/imageFee'
import {useNotification} from 'web3uikit'
import {valueSubmit} from '../types/CreateQuestions.type'

const ContentCreateWord = styled.div`a
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

    @media(max-width: 555px){
        display: none;
    }
    
  p{
    font-weight: 600;
    margin-bottom: 1.6rem;
  }
`

const GeneratedPictureMobile = styled.div`
        max-width: 52.4rem;
        padding: 5rem 0 2rem 0;
        width: 100%;
        display: none;

        @media(max-width: 555px){
            display: inherit;
        }

        p{
            font-weight: 600;
            margin-bottom: 1.6rem;
        }
`

interface props{
    onChange? : React.ChangeEvent<HTMLInputElement> 
}

const CreateQuestionCard:React.FC<props> = () => {
    const dispatchNotification = useNotification();
    const [img, setImg] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [isPreview, setIsPreview] = useState<boolean>(false)
    
    const {saveFile} = useMoralisFile();
    const {Moralis, authenticate, chainId, isWeb3Enabled, isAuthenticated} = useMoralis();
    const { save } = useNewMoralisObject("questions");

    const mint = useSafeMint()
    const imageFee = useImageFee()

    const valid:any = useMemo(() => {
        return yup.object().shape({
           Word: wordValid,
           Prize: yup.number().typeError('Must be a number').required('Prize is required'),
           Attempt_price: yup.number().typeError('Must be a number').required('Price per attempt is required'),
        })
     }, [])

    useEffect(() => {
        if(
           status === "Sending ethereum" ||
           status === "Image generation" ||
           status === "Creating a question"
        ) {
           const onUnload = (evt:any) => {
              let message = "изменения не сохранятся";
              if (typeof evt == "undefined") {
                 evt = window.event;
              }
              if (evt) {
                 evt.returnValue = message;
              }
              return message;
           }
           window.addEventListener("beforeunload", onUnload);
           return  window.removeEventListener("beforeunload", onUnload);
        }
    }, [status])

    const submit = (Word:string) => async () => {
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

        if(Word.length === 0) {
            dispatchNotification({
                type: 'error',
                message: 'Write the word',
                title: 'Error',
                icon: "info",
                position:'topR',
            });
            return
        }

        const fetchStr = Word.replace(/\s/g, "+");
  
        setStatus("Sending ethereum")
        const payble = await imageFee();
        if(payble) {
           setStatus('Image generation');
            dispatchNotification({
                type: 'info',
                message: 'Image generation',
                title: 'Info',
                icon: "info",
                position:'topR',
            });
  
           await fetch(`https://api.mintface.io/image?q=`) // ${urlImg}${fetchStr}
              .then( response =>  response.blob())
              .then( async (blob) => {
                 let file = new File([blob], "name.png");
  
                 await saveFile("prev_img.jpg", file, {
                    type: "image/png",
                    saveIPFS: true,
                    onSuccess: (result:any) => {
                        console.log(result._url)
                        setImg(result._url);
                    },
                    onError: (error:any) => console.log(error),
                 })
              })
  
            setStatus('Image generation The picture has been generated!');
            dispatchNotification({
                type: 'info',
                message: 'Image generation The picture has been generated!',
                title: 'Info',
                icon: "info",
                position:'topR',
            });
        } else {
            dispatchNotification({
                type: 'error',
                message: 'Not enough Ethereum',
                title: 'Error',
                icon: "info",
                position:'topR',
            });
        }
    }

    const createQuestions = async (values:valueSubmit) => {
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

        setStatus('Creating a question');
        dispatchNotification({
            type: 'info',
            message: 'Creating a question',
            title: 'Info',
            icon: "info",
            position:'topR',
        });
        const Questions = Moralis.Object.extend("questions");
        const query = new Moralis.Query(Questions);
        const objAll = await query
        .find();
        const objLast:any = objAll[objAll.length - 1];
  
        const Wordbroken = () => {
           const wordsArr = values.Word.split(' ')
           const wordsNumber = wordsArr.length
           let Wordbroken = `${wordsNumber}:`;
           
           for(let i in wordsArr) {
              Wordbroken = Wordbroken + wordsArr[i].length + ','
           }
     
           return Wordbroken.slice(0, -1)
        }
        
        let validID = objLast ? String(Number(objLast.attributes.ID)) : 0;
  
        let questions = {
           ID: String(Number(validID) + 1), 
           guessed:false,
           wordbroken:Wordbroken(),
           attempt:0,
           attempt_price:String(Moralis.Units.ETH(values.Attempt_price)),
           prize:Number(values.Prize),
           date:Date.now(),
           img: img,
           user:Moralis.User.current(),
        }
  
        let meta = {
           "name":`MindBreaker.Games question #${questions.ID}`,
           "description":"What is shown in the picture?",
           "image":questions.img
        }
  
        const fileMeta = new Moralis.File("file.json", {
           base64: btoa(JSON.stringify(meta)),
        });
  
        const metaUrl:any = await fileMeta.saveIPFS()
        console.log(metaUrl._ipfs)
        console.log(metaUrl._ipfs.replace(`"`, ''))
  
        const questionsMint ={ 
           word:values.Word,
           attempt_price: questions.attempt_price,
           prize: questions.prize,
        }
  
        const isMint = await mint(questionsMint, metaUrl._ipfs.replace(`"`, '') , setStatus)
  
        if(isMint) {
           await save(
              questions,
              {
                onSuccess:(result:any) => {
                    console.log(result)
                    dispatchNotification({
                        type: 'success',
                        message: 'You have created a word!',
                        title: 'Success',
                        icon: "info",
                        position:'topR',
                    });
                }, 
                 onError:(error:any) => {
                    console.log(error)
                    dispatchNotification({
                        type: 'error',
                        message: 'Error!',
                        title: 'Error',
                        icon: "info",
                        position:'topR',
                    });
                 }, 
              }
           )
           setStatus('');
        }
    }

    return(
        // <motion.div
        //     initial={{opacity: "0", y: "-1500px"}}
        //     animate={{opacity: "1", y: '0'}}
        //     exit={{opacity: "0", y: "-1500px"}}
        // >
        <main style={{position: 'relative'}}>
            { typeof window !== 'undefined'
                ? window.innerWidth <= 555 ? <HeaderMobile/> : <Header/>
                : null
            }
            <Container>
                <Formik
                    initialValues={{
                        Word:'',
                        Prize:'',
                        Attempt_price:'',
                    }}
                    validationSchema={valid}
                    onSubmit={async (values) => {
                        if(!isWeb3Enabled || !isAuthenticated) {
                            await authenticate()
                        }
                        
                        status === 'Image generation The picture has been generated!' && createQuestions(values)
                    }}
                >
                    {({ errors, touched, values, }) => (
                        <Form>
                            <h1 style={{textAlign: "center", fontSize: "3.2rem", margin: '3rem 0 7.2rem 0'}}>Create a keyword</h1>
                            <img
                                style={{position: "absolute", zIndex: '-1', top: '15%', right: "0", width: "100%"}}
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
                                        <Input 
                                            style={{marginBottom: "4.8rem"}} 
                                            placeholder={'Enter the word'} 
                                            value={values.Word} 
                                            name='Word'
                                        />
                                        {errors.Word && touched.Word && <p>{errors.Word}</p>}
                                        <ActionButton onClick={submit(values.Word)}>
                                            Generate
                                        </ActionButton>
                                    </div>
                                    <GeneratedPictureMobile>
                                        {img.length !== 0 && 
                                        <>
                                            <p>Generated picture</p>
                                            <img src={img} alt={'generate-img'}/>
                                        </>
                                        }
                                    </GeneratedPictureMobile>
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
                                                <Input 
                                                    value={values.Prize} 
                                                    name='Prize'
                                                    placeholder={'ETH'}
                                                />
                                                {errors.Prize && touched.Prize && <p>{errors.Prize}</p>}
                                            </div>
                                            <div style={{maxWidth: '260px'}}>
                                                <p>Coast of try</p>
                                                <Input 
                                                    value={values.Attempt_price} 
                                                    name='Attempt_price'
                                                    placeholder={'ETH'}
                                                />
                                                {errors.Attempt_price && touched.Attempt_price && <p>{errors.Attempt_price}</p>}
                                            </div>
                                        </Inputs>
                                        <ActionButton type="button" onClick={() => setIsPreview(!isPreview)}>
                                            Preview
                                        </ActionButton>
                                    </div>
                                </StepsCreateWord>
                                <GeneratedPicture>
                                    {img.length !== 0 &&
                                    <>
                                        <p>Generated picture</p>
                                        <img src={img} alt={'generate-img'}/>
                                    </>
                                    }
                                </GeneratedPicture>
                            </ContentCreateWord>

                            {
                                img.length !== 0 && 
                                values.Attempt_price.length !== 0 &&
                                values.Prize.length !== 0 &&
                                values.Word.length !== 0 &&
                                isPreview &&
                                <div style={{margin: "0 0"}}>
                                    <h4 style={{marginBottom: "2.4rem"}}>3. Preview</h4>
                                    <LayoutQuestionCard
                                        id={'1'}
                                        img={img}
                                        price_coin={values.Prize}
                                        price_currency={values.Prize}
                                        attempts_made={'10'}
                                        word={values.Word}
                                    />
                                </div>
                            }
                            <div style={{textAlign: "center"}}>
                                <ActionButton type="submit">
                                    Publish
                                </ActionButton>
                            </div>
                        </Form>
                    )}
                </Formik>
                
                <Footer/>
            </Container>
            <GlobalStyled/>
        </main>
            // </motion.div>
    )
}

export default CreateQuestionCard;
