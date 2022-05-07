import { 
   Title,
   TextInfo,
   Body,
   BodyForm,
   BodyInput,
   Input,
   TitleInput,
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
   const {Moralis, authenticate, chainId, isWeb3Enabled, isAuthenticated} = useMoralis();
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

      setStatus("Sending ethereum")
      const payble = await imageFee();
      if(payble) {
         setStatus('Image generation');

         await fetch(`https://api.mintface.io/image?q=`) // ${urlImg}${fetchStr}
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
      } else {
         setStatus("Not enough Ethereum")
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

      let validID = objLast ? String(Number(objLast.attributes.ID)) : 0;

      let questions = {
         ID:String(Number(validID) + 1), 
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
      <>
         {typeof question == 'object' &&
            <QuestionPreiew 
               question={question}
               setModal={setQuestion}
            />
         }
         <Body>
            <Title>Create question</Title>

            <TextInfo>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</TextInfo>
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
                  
                  status === '' && submit(values.Word)
                  status === 'Image generation The picture has been generated!' && createQuestions(values)
               }}
            >
               {({ errors, touched, values, }) => (
                  <BodyForm>
                     <BodyInput>
                        <TitleInput>Word:</TitleInput>
                        <Input 
                           value={values.Word} 
                           name='Word'
                           placeholder='Word'
                           type='text'
                           autoComplete="off"
                           required
                        />
                        {errors.Word && touched.Word && <Error>{errors.Word}</Error>}
                     </BodyInput>

                     <BodyInput>
                        <TitleInput>Prize:</TitleInput>
                        <Input 
                           value={values.Prize} 
                           name='Prize'
                           placeholder='Prize'
                           type='number'
                           autoComplete="off"
                           required
                        />
                        {errors.Prize && touched.Prize && <Error>{errors.Prize}</Error>}
                     </BodyInput>

                     <BodyInput>
                        <TitleInput>Attempt price:</TitleInput>
                        <Input 
                           value={values.Attempt_price} 
                           name='Attempt_price'
                           placeholder='Attempt_price'
                           type='number'
                           autoComplete="off"
                           required
                        />
                        {errors.Attempt_price && touched.Attempt_price && <Error>{errors.Attempt_price}</Error>}
                     </BodyInput>

                     <Loading>{status}</Loading>
                     {(
                        status === "Image generation" || 
                        status === "Creating a question" ||
                        status === "Sending ethereum"
                     ) &&
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
                        (chainId === '0x4' &&
                        isWeb3Enabled) || 
                        isAuthenticated ?
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
      </>
   )
}

export default CreateQuestionsComp;