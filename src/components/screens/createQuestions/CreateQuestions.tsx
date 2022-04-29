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
import {useMemo, useState } from 'react'
import { 
   // useMoralisFile, 
   // useNewMoralisObject, 
   useMoralis,
} from "react-moralis";
import {valueSubmit, questionsObject} from './CreateQuestions.type'
import {urlImg} from '../../../shared/urls/urls'

const CreateQuestionsComp = () => {
   const [status, setStatus] = useState('')
   const [imgSrc, setImgSrc] = useState('')
   // const {saveFile} = useMoralisFile();
   const {Moralis} = useMoralis();
   // const { save } = useNewMoralisObject("questions");

   const ethers = Moralis.web3Library;

   const valid = useMemo(() => {
      return yup.object().shape({
         Word: yup.string().typeError('Must be a string').lowercase('With the lower letter').matches(/^[a-z]+(?:\s[a-z]+){0,4}$/, 'not').required('Word is Required'),
         Prize: yup.number().typeError('Must be a number').required('Prize is required'),
         Attempt_price: yup.number().typeError('Must be a number').required('Price per attempt is required'),
      })
   }, [])

   const submit = async (values:valueSubmit) => {
      setStatus('Image generation')
      const fetchStr = values.Word.replace(/\s/g, "+");

      let questions:questionsObject = {
         word:`0x${ethers.utils.id(values.Word)}`,
         attempt:0,
         attempt_price:Number(values.Attempt_price),
         prize:Number(values.Prize),
         date:Date.now(),
         view: 0,
         img: '',
      }

      console.log(questions)

      function getBase64Img() {
         return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAMFBMVEX////7+/vr6+vNzc2qqqplywBWrQD/Y5T/JTf+AADmAABeeEQvNydqAAAGBAMAAAGoF14oAAAEBUlEQVR42u2WTUwUVxzA/2925LIojsyqCLtMqSQeFJeFROPHstjdNkZdkaiX9mRTovYgSYNFE43Rg5IeNG5SqyaVcGzXkvTm7hZWq9bKriAYYzSLBI3WAplp0jY2kV3fzPuYGcBxD/bmO0zevPeb//f7v0FQ5EDvwf8LFG89ixYDol9Wo+smKal2sHF6kM6q7qbE5tY03d7SHR6ygiuvwY1txkzIlPaD3NQ4Zryk/PCP1wKibBlI97dq+idXUxqgcEkVnruS/smRpuWaCbrHU5pc/wyTQsata0U77wVBTlRP9UNkT9oE61K9AHL9VERbeTVurMjNm54mqrFw8CwKmWBfpf6V2Dx/TdxN3YjMf2JwIEZ8JnjnEbEjvLAQZ1EKlxkciJ9UcdD1Z5ztDmgsgPIrMkWtMgfd41xOYXZOIjUcLB3tdchypHWIgb5k2gH0nE0zMHjRCRTLWxgY/VQrDuybcAQ/DDEwmwEn8COlSDBcTUE0GXcEjRzqoDDhDH7sfccg2szAt9hogjBFQFRmDyd9N1VTEFegXXKEVKQFJHEUd0DSKhLthIm0HSQpnNdCNizgq147GP0m7QTygNMye6NqM9ekwlG4kLI5I4cMZ+bVhMA8MwX1rw9oIjakAYX6jXlBRRJ4BF6PwmRSfQyLFhJwWy/IG8khKuirljODG0DfGAd3qCBNEol5vCqFAxqYLeUyB0H2A2Q0DspRD3BQfJEc5KBl6KprG6pNEPqqfkKzOQBsha2bQeVw6g3nSySaGYgb99ylhsLDLVYQ3E+oozOGHKzVbCBs+HkuUm6ivd4E0ZYeNTPTTrn51+0wA9TJgpZVLeaV1y+4yS8c64W0/AcFTBCHK/fFEMwFAmo4KRldE0ZxsF8cGbTuzYqHtOz8t6e8TMk5CcjNSC+kdcfgPyag9AoDhUQARmvAcIiAW3v0JzWJg64BJXdBQ21+/b4zwMqRW5dA2h3I7+onYJd+Y4i3FbyMxz4hxE7hS2MBdSq6Fgq6Bny/dxv6Sk76COj6Yz91ZG8dToQ7oYNCqu4QjX9FK5UoPt/PXO701mruhwcxGP2ecahzzxBtUtlzLHclsXtBA6wc+a2brlUc8TCvg5cPM7LiaOPT8Y4ub3bpAbqy+MQ18xRmvIe5nr83YXDt8Nca0/GveWniSHByybEVwx1dD1ccYB/6yF8DTaGcYLFA391o6DjjohaWfKXQ/xCWazmhPDhNbYf2WH4fse9zhRUkLwrXlUD+9iVD5HR77KWheclxkqsZ1bM+pqcWZ2xVe0zXjPb6pyO8IK1l5trcA7mLKuo48+VpQG0BuPmZeTbs9Vi+9oQyqv6Ieyou4FybU+HqRS4o+TH1VG7MvgFFjvfguwFfA4FobmCxcnTPAAAAAElFTkSuQmCC";
      }

      var base64img = getBase64Img();
      
      function Base64ToImage() {
         var img = new Image();
         img.onload = function() {
            img.src = base64img;
         };
         console.log(img)
      }
      Base64ToImage()


      // const img = await fetch(`${urlImg}${fetchStr}`, {
      //    mode: 'no-cors',
      // })
      
      // const responseImg = await img.blob()
      // console.log(responseImg)
      // setImgSrc(URL.createObjectURL(responseImg))
      // setStatus('')

      // await saveFile("prev_img.jpg", responseImg, {
      //    type: "image/png",
      //    saveIPFS: true,
      //    onSuccess: (result) => {
      //       questions.img = result._url
      //    },
      //    onError: (error) => console.log(error),
      // })

      // await save(
      //    questions,
      //    {
      //       onSuccess:(result) => {
      //          console.log(result)
      //       }, 
      //       onError:(error) => {
      //          console.log(error)
      //       }, 
      //    }
      // )

      const meta = {
         "name":"Avatar #183919140",
         "description":"This avatar was created by GAN (generative adversarial network) and exists in a single copy.",
         "image":questions.img
      }
   }

   return(
      <Container>
         <Body>
            <Formik
               initialValues={{
                  Word:'',
                  Prize:'',
                  Attempt_price:'',
               }}
               validationSchema={valid}
               onSubmit={(values) => {
                  submit(values)
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

                     <Submit>Next</Submit>
                     <Loading>{status}</Loading>
                     {/* {imgSrc.length > 0 && */}
                        <img 
                           alt="" 
                           src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAMFBMVEX////7+/vr6+vNzc2qqqplywBWrQD/Y5T/JTf+AADmAABeeEQvNydqAAAGBAMAAAGoF14oAAAEBUlEQVR42u2WTUwUVxzA/2925LIojsyqCLtMqSQeFJeFROPHstjdNkZdkaiX9mRTovYgSYNFE43Rg5IeNG5SqyaVcGzXkvTm7hZWq9bKriAYYzSLBI3WAplp0jY2kV3fzPuYGcBxD/bmO0zevPeb//f7v0FQ5EDvwf8LFG89ixYDol9Wo+smKal2sHF6kM6q7qbE5tY03d7SHR6ygiuvwY1txkzIlPaD3NQ4Zryk/PCP1wKibBlI97dq+idXUxqgcEkVnruS/smRpuWaCbrHU5pc/wyTQsata0U77wVBTlRP9UNkT9oE61K9AHL9VERbeTVurMjNm54mqrFw8CwKmWBfpf6V2Dx/TdxN3YjMf2JwIEZ8JnjnEbEjvLAQZ1EKlxkciJ9UcdD1Z5ztDmgsgPIrMkWtMgfd41xOYXZOIjUcLB3tdchypHWIgb5k2gH0nE0zMHjRCRTLWxgY/VQrDuybcAQ/DDEwmwEn8COlSDBcTUE0GXcEjRzqoDDhDH7sfccg2szAt9hogjBFQFRmDyd9N1VTEFegXXKEVKQFJHEUd0DSKhLthIm0HSQpnNdCNizgq147GP0m7QTygNMye6NqM9ekwlG4kLI5I4cMZ+bVhMA8MwX1rw9oIjakAYX6jXlBRRJ4BF6PwmRSfQyLFhJwWy/IG8khKuirljODG0DfGAd3qCBNEol5vCqFAxqYLeUyB0H2A2Q0DspRD3BQfJEc5KBl6KprG6pNEPqqfkKzOQBsha2bQeVw6g3nSySaGYgb99ylhsLDLVYQ3E+oozOGHKzVbCBs+HkuUm6ivd4E0ZYeNTPTTrn51+0wA9TJgpZVLeaV1y+4yS8c64W0/AcFTBCHK/fFEMwFAmo4KRldE0ZxsF8cGbTuzYqHtOz8t6e8TMk5CcjNSC+kdcfgPyag9AoDhUQARmvAcIiAW3v0JzWJg64BJXdBQ21+/b4zwMqRW5dA2h3I7+onYJd+Y4i3FbyMxz4hxE7hS2MBdSq6Fgq6Bny/dxv6Sk76COj6Yz91ZG8dToQ7oYNCqu4QjX9FK5UoPt/PXO701mruhwcxGP2ecahzzxBtUtlzLHclsXtBA6wc+a2brlUc8TCvg5cPM7LiaOPT8Y4ub3bpAbqy+MQ18xRmvIe5nr83YXDt8Nca0/GveWniSHByybEVwx1dD1ccYB/6yF8DTaGcYLFA391o6DjjohaWfKXQ/xCWazmhPDhNbYf2WH4fse9zhRUkLwrXlUD+9iVD5HR77KWheclxkqsZ1bM+pqcWZ2xVe0zXjPb6pyO8IK1l5trcA7mLKuo48+VpQG0BuPmZeTbs9Vi+9oQyqv6Ieyou4FybU+HqRS4o+TH1VG7MvgFFjvfguwFfA4FobmCxcnTPAAAAAElFTkSuQmCC'}
                        />
                     {/* } */}
                  </BodyForm>
               )}
            </Formik>
         </Body>
      </Container>
   )
}

export default CreateQuestionsComp;