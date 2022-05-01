import { 
   Container,
   Body,
   BodyForm,
   Input,
   Title,
   Submit,
   Error,
   Loading
} from "./CreateQuestions.styled"

import {Formik} from 'formik'
import * as yup from 'yup';
import { useMemo, useState } from 'react'
import { 
   useMoralisFile, 
   useNewMoralisObject, 
   useMoralis,
} from "react-moralis";
import {valueSubmit} from './CreateQuestions.type'
import {urlImg} from '../../../shared/urls/urls'
import {wordValid} from '../../../shared/variable'
import {useSafeMint} from '../../../hooks/mint'
import {useImageFee} from '../../../hooks/imageFee'
import QuestionPreiew from "../../shared/modals/questionPreview/questionPreview";
import lock from '../../../assets/img/lock.svg'
import { useAppDispatch } from "../../../store/hooks"
import { setSuccess } from "../../../store/sliced/success/success.slice"

const CreateQuestionsComp = () => {
   const dispatch = useAppDispatch();
   const [status, setStatus] = useState<string>('')
   const [question, setQuestion] = useState<undefined | any>(undefined)
   const [img, setImg] = useState<string>('')

   const {saveFile} = useMoralisFile();
   const {Moralis, chainId, isWeb3Enabled} = useMoralis();
   const { save } = useNewMoralisObject("questions");
   const mint = useSafeMint()
   const imageFee = useImageFee()

   const valid = useMemo(() => {
      return yup.object().shape({
         Word: wordValid,
         Prize: yup.number().typeError('Must be a number').required('Prize is required'),
         Attempt_price: yup.number().typeError('Must be a number').required('Price per attempt is required'),
      })
   }, [])

   const submit = async (Word:string) => {
      const fetchStr = Word.replace(/\s/g, "+");

      const payble = await imageFee();
      if(payble) {
         setStatus('Image generation');

         await fetch(`${urlImg}${fetchStr}`)
            .then( response =>  response.blob())
            .then( async (blob) => {
               let file = new File([blob], "name.png");

               await saveFile("prev_img.jpg", file, {
                  type: "image/png",
                  saveIPFS: true,
                  onSuccess: (result:any) => {
                     setImg(result._url);
                  },
                  onError: (error:any) => console.log(error),
               })
            })

         setStatus('Image generation The picture has been generated!');
      }
   }

   const createQuestions = async (values:valueSubmit) => {
      setStatus('Creating a question');
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
      
      let questions = {
         id: objLast._objCount + 1,
         wordbroken:Wordbroken(),
         attempt:0,
         attempt_price:Number(Moralis.Units.ETH(Number(values.Attempt_price))),
         prize:Number(values.Prize),
         date:Date.now(),
         img: img,
         user:Moralis.User.current(),
      }

      const meta = {
         "name":`MindBreaker.Games question #${questions.id}`,
         "description":"What is shown in the picture?",
         "image":questions.img
      }

      const questionsMint ={ 
         word:values.Word,
         attempt_price: questions.attempt_price,
         prize: questions.prize,
      }

      const isMint = await mint(questionsMint, JSON.stringify(meta))

      if(isMint) {
         console.log(questions)
         await save(
            questions,
            {
               onSuccess:(result:any) => {
                  console.log(result)
                  dispatch(setSuccess("You have created a word!"));
               }, 
               onError:(error:any) => {
                  console.log(error)
               }, 
            }
         )
         setStatus('');
      }
   }

   const questionPreview = (values:valueSubmit) => async () => {
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
      
      let questions = {
         id: objLast._objCount + 1,
         wordbroken:Wordbroken(),
         attempt:0,
         attempt_price:Number(values.Attempt_price),
         prize:values.Prize,
         date:Date.now(),
         img: img,
      }

      setQuestion(questions)
   }

   return(
      <Container>
         {typeof question == 'object' &&
            <QuestionPreiew 
               setModal={setQuestion}
               question={question}
            />
         }
         <Body>
            <Formik
               initialValues={{
                  Word:'',
                  Prize:'',
                  Attempt_price:'',
               }}
               validationSchema={valid}
               onSubmit={(values) => {
                  if(chainId === '0x4' && isWeb3Enabled) {
                     status === '' && submit(values.Word)
                     status === 'Image generation The picture has been generated!' && createQuestions(values)
                  }
               }}
            >
               {({ errors, touched, values, }) => (
                  <BodyForm>
                     <Title>Word</Title>
                     <Input 
                        value={values.Word} 
                        name='Word'
                        placeholder='Word'
                        type='text'
                        autoComplete="off"
                        required
                     />
                     {errors.Word && touched.Word && <Error>{errors.Word}</Error>}

                     <Title>Prize</Title>
                     <Input 
                        value={values.Prize} 
                        name='Prize'
                        placeholder='Prize'
                        type='number'
                        autoComplete="off"
                        required
                     />
                     {errors.Prize && touched.Prize && <Error>{errors.Prize}</Error>}

                     <Title>Attempt price</Title>
                     <Input 
                        value={values.Attempt_price} 
                        name='Attempt_price'
                        placeholder='Attempt_price'
                        type='number'
                        autoComplete="off"
                        required
                     />
                     {errors.Attempt_price && touched.Attempt_price && <Error>{errors.Attempt_price}</Error>}

                     <Loading>{status}</Loading>
                     {(status === "Image generation" || status === "Creating a question") &&
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                     }

                     {status === "Image generation The picture has been generated!" &&
                        <>
                           <Submit>Create questions</Submit>
                           <Submit 
                              type="button"
                              onClick={questionPreview(values)}
                           >Question preview</Submit>
                        </>
                     }
                     
                     
                     {status === "" ?
                        chainId === '0x4' && isWeb3Enabled ?
                           <Submit>ok</Submit>
                           :
                           <Submit>
                              <img 
                              width="25px"
                              src={lock}
                              alt=""
                              />
                           </Submit>
                        :
                        ""
                     }
                  </BodyForm>
               )}
            </Formik>
         </Body>
      </Container>
   )
}

export default CreateQuestionsComp;