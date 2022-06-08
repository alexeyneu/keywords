import * as React from 'react';
import styled from "styled-components";
import {useState} from "react";
import {ModalsBackground} from "../../modals/modals-background";
import {CreatedWordModal} from "../../modals/CreatedWordModal/CreatedWordModal";
import {KeyWordModal} from "../../modals/KeyWordModal/KeyWordModal";
import {WalletMessageModal} from "../../modals/WalletMessageModal/WalletMessageModal";

const FooterKey = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
  
    padding: 17rem 0 4.8rem 0;
  
  @media(max-width: 645px){
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 17rem 0 3.8rem 0;
  }
`

const UlListRules = styled.ul`
  display: flex;

  @media(max-width: 645px){
    margin: 5rem 0;
  }

  li {
    list-style-type: none;
    position: relative;
    padding: 0 2.4rem;

    &:not(:last-child):before {
      content: '';
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      right: 0;
      top: 0;
      width: 0.1rem;
      height: 100%;
    }

    a {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`

const SocialListDiv = styled.div`
    
    a:not(:last-child){
      margin: 0 24px 0 0;
    }
`

export const Footer = () =>{

    const [isActiveCreateWord, setIsActiveCreateWord] = useState<boolean>(false);
    const [isWalletMessage, setIsWalletMessage] = useState<boolean>(false);

    return(
        <FooterKey>
            <h2>Keywords.game</h2>
            <UlListRules>
                <li><a href="#">Terms</a></li>
                <li><a href="#">FAQs</a></li>
            </UlListRules>
            <SocialListDiv>
                <a href="#" onClick={() => setIsActiveCreateWord(!isActiveCreateWord)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3939 11.4919C18.0228 11.7979 18.6007 12.1548 19.1446 12.5797C21.0313 14.0585 22.3146 15.9452 22.986 18.2483C23.02 18.3588 22.9945 18.3758 22.884 18.3758C21.6687 18.3758 20.4449 18.3673 19.2296 18.3758C19.1021 18.3758 19.0936 18.3078 19.0596 18.2228C18.6177 16.9395 17.9038 15.8262 16.867 14.9338C15.8981 14.1095 14.7763 13.6166 13.51 13.4636C13.3995 13.4466 13.4165 13.5146 13.4165 13.5741C13.4165 14.4579 13.4165 15.3418 13.4165 16.2256C13.4165 16.897 13.4165 17.5769 13.4165 18.2483C13.4165 18.3333 13.408 18.3673 13.306 18.3673C11.8018 18.3758 10.3145 18.2228 8.87824 17.7554C6.28615 16.914 4.33997 15.2908 2.99718 12.9367C2.19831 11.5429 1.70539 10.0386 1.39944 8.47488C1.15298 7.24258 1.03399 6.00178 1 4.75248C1 4.6505 1.017 4.625 1.12748 4.625C2.30029 4.625 3.4731 4.6335 4.64592 4.625C4.7564 4.625 4.7734 4.66749 4.7734 4.76098C4.79039 5.60234 4.85838 6.44371 5.00286 7.27658C5.27481 8.88282 5.75074 10.4126 6.69409 11.7639C7.38248 12.7582 8.24934 13.5486 9.39665 13.999C9.54963 14.0585 9.70261 14.1095 9.87258 14.1435C9.87258 14.084 9.87258 14.0245 9.87258 13.9735C9.87258 10.914 9.87258 7.84598 9.87258 4.78647C9.87258 4.66749 9.89807 4.625 10.0256 4.625C11.1049 4.6335 12.1927 4.6335 13.272 4.625C13.3995 4.625 13.425 4.66749 13.425 4.78647C13.425 6.4862 13.425 8.17743 13.425 9.87716C13.425 10.0726 13.425 10.0726 13.612 10.0386C14.3854 9.90266 15.0567 9.55421 15.6687 9.07829C17.0879 7.96496 18.0398 6.5202 18.5837 4.81197C18.6262 4.67599 18.6772 4.625 18.8301 4.625C19.901 4.6335 20.9633 4.625 22.0341 4.6335C22.0851 4.6335 22.1361 4.625 22.2041 4.65049C21.5837 7.60802 19.9095 9.83466 17.3939 11.4919Z" fill="#6A34FF"/>
                    </svg>
                </a>
                <a href="#" onClick={() => setIsWalletMessage(!isWalletMessage)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 2.9998C22.0424 3.67528 20.9821 4.19191 19.86 4.5298C19.2577 3.83731 18.4573 3.34649 17.567 3.12373C16.6767 2.90096 15.7395 2.957 14.8821 3.28426C14.0247 3.61151 13.2884 4.1942 12.773 4.95352C12.2575 5.71283 11.9877 6.61214 12 7.5298V8.5298C10.2426 8.57537 8.50127 8.18561 6.93101 7.39525C5.36074 6.60488 4.01032 5.43844 3 3.9998C3 3.9998 -1 12.9998 8 16.9998C5.94053 18.3978 3.48716 19.0987 1 18.9998C10 23.9998 21 18.9998 21 7.4998C20.9991 7.22126 20.9723 6.9434 20.92 6.6698C21.9406 5.6633 22.6608 4.39251 23 2.9998Z" fill="#6A34FF"/>
                    </svg>
                </a>
                <a href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#6A34FF"/>
                    </svg>
                </a>
                <a href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.8849 16.6828C18.8173 17.3242 17.7163 17.8643 16.5485 18.2694C14.1352 19.0908 11.6885 19.1134 9.23064 18.5732C7.48458 18.1794 5.78301 17.628 4.17041 16.8178C4.13705 16.7953 4.09256 16.7615 4.02583 16.8066C4.93779 17.9206 6.12777 18.562 7.47346 19.0121C7.05085 19.5522 6.63936 20.0698 6.22787 20.5874C6.16114 20.6775 6.07217 20.6662 5.9832 20.6662C4.35948 20.6325 2.83585 20.1824 1.50128 19.2484C0.355779 18.4382 -0.111319 17.2792 0.0221371 15.8726C0.244565 13.532 0.745027 11.259 1.61249 9.076C2.758 6.18407 4.88218 4.50743 7.92944 4.04607C8.14075 4.01231 8.35205 4.02356 8.55224 4.00106C8.71906 3.98981 8.81915 4.06857 8.897 4.22611C7.0286 4.70997 5.26031 5.39638 3.7478 6.64543C9.15279 4.21486 14.5467 4.23736 19.9294 6.7242C18.4836 5.57643 16.8377 4.87876 15.0805 4.34989C15.1917 4.11358 15.3585 4.01231 15.6254 4.04607C18.8729 4.34989 21.1416 6.02653 22.3872 9.06474C23.2547 11.1802 23.7552 13.4083 23.9776 15.6813C24.1222 17.1666 23.5661 18.3482 22.3427 19.1696C20.9971 20.0698 19.4957 20.5199 17.8831 20.5649C17.7163 20.5649 17.5939 20.5312 17.4827 20.3849C17.1602 19.9573 16.8265 19.541 16.4818 19.1359C16.3261 18.9446 16.3817 18.8995 16.5819 18.832C17.6495 18.4945 18.6171 17.9881 19.4401 17.2117C19.6291 17.0429 19.7848 16.8853 19.8849 16.6828ZM17.8163 13.4983C17.8163 12.2943 16.8377 11.2815 15.7033 11.2815C14.58 11.2928 13.6013 12.3055 13.6013 13.487C13.6013 14.6798 14.5689 15.7038 15.7033 15.7151C16.8488 15.7151 17.8275 14.6911 17.8163 13.4983ZM6.08329 13.4758C6.08329 14.6798 7.02861 15.7038 8.16299 15.7151C9.28625 15.7263 10.2872 14.6911 10.2872 13.5095C10.2872 12.3168 9.30849 11.2928 8.17411 11.2928C7.06197 11.2815 6.09441 12.2943 6.08329 13.4758Z" fill="#6A34FF"/>
                    </svg>
                </a>
            </SocialListDiv>
            {isActiveCreateWord ? <ModalsBackground>
                <KeyWordModal/>
            </ModalsBackground> : ''}
            {isWalletMessage ? <ModalsBackground>
                <WalletMessageModal/>
            </ModalsBackground> : ''}
        </FooterKey>
    )
}
