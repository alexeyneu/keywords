import styled from "styled-components";
import {useState} from "react";
import {SortList} from "../SortList/SortList";

export const ListFilter = () => {

    const FilterContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
      
      @media (max-width: 527px){
        flex-direction: column;
        align-items: flex-start;
      }
    `

    const UlFilterList = styled.ul`
      display: flex;
      @media (max-width: 527px){
        margin-bottom: 3rem;
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
          width: 0.2rem;
          height: 100%;
        }

        a {
          text-decoration: none;
          color: rgba(0, 0, 0, 0.5);
          
          @media(max-width: 390px){
            font-size: 16px;
          }
          
          @media(max-width: 330px){
            font-size: 12px;
          }
        }
      }
    `

    const SortByDiv = styled.div`
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
    `

    const [isActiveSortMenu, setIsActiveSortMenu] = useState(false);

    return(
        <FilterContainer>
            <UlFilterList>
                <li><a href="#">All</a></li>
                <li><a href="#">My questions</a></li>
                <li><a href="#">Solved</a></li>
            </UlFilterList>
            <SortByDiv onClick={() => setIsActiveSortMenu(!isActiveSortMenu)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.857 12.8574C17.2161 12.8574 18.364 13.7611 18.7328 15.0003L20.5713 15.0002C21.0447 15.0002 21.4284 15.384 21.4284 15.8574C21.4284 16.3307 21.0447 16.7145 20.5713 16.7145L18.7326 16.7152C18.3635 17.9541 17.2157 18.8574 15.857 18.8574C14.4983 18.8574 13.3505 17.9541 12.9815 16.7152L3.42843 16.7145C2.95504 16.7145 2.57129 16.3307 2.57129 15.8574C2.57129 15.384 2.95504 15.0002 3.42843 15.0002L12.9812 15.0003C13.35 13.7611 14.4979 12.8574 15.857 12.8574ZM15.857 14.3574C15.0286 14.3574 14.357 15.0289 14.357 15.8574C14.357 16.6858 15.0286 17.3574 15.857 17.3574C16.6854 17.3574 17.357 16.6858 17.357 15.8574C17.357 15.0289 16.6854 14.3574 15.857 14.3574ZM8.99986 5.14307C10.3589 5.14307 11.5069 6.04678 11.8757 7.28606L20.5713 7.28592C21.0447 7.28592 21.4284 7.66968 21.4284 8.14307C21.4284 8.61645 21.0447 9.00021 20.5713 9.00021L11.8754 9.00093C11.5064 10.2398 10.3586 11.1431 8.99986 11.1431C7.64111 11.1431 6.49335 10.2398 6.12431 9.00093L3.42843 9.00021C2.95504 9.00021 2.57129 8.61645 2.57129 8.14307C2.57129 7.66968 2.95504 7.28592 3.42843 7.28592L6.12405 7.28606C6.49281 6.04678 7.6408 5.14307 8.99986 5.14307ZM8.99986 6.64307C8.17143 6.64307 7.49986 7.31464 7.49986 8.14307C7.49986 8.97149 8.17143 9.64307 8.99986 9.64307C9.82829 9.64307 10.4999 8.97149 10.4999 8.14307C10.4999 7.31464 9.82829 6.64307 8.99986 6.64307Z" fill="#6A34FF"/>
                </svg>
                <p style={{fontWeight: "600", margin: "0 1.2rem"}}>Sort by</p>
                <svg className={!isActiveSortMenu ? '' : 'active-arrow'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.63508 17.442C9.327 17.8014 9.36863 18.3425 9.72805 18.6506C10.0875 18.9586 10.6286 18.917 10.9367 18.5576L16.0795 12.5576C16.3547 12.2366 16.3547 11.7629 16.0795 11.442L10.9367 5.44196C10.6286 5.08253 10.0875 5.04091 9.72805 5.34899C9.36863 5.65706 9.327 6.19818 9.63508 6.5576L14.2998 11.9998L9.63508 17.442Z" fill="black"/>
                </svg>
                <div style={{position: "absolute", top: "150%", right: "0", zIndex: "1"}}>
                    {isActiveSortMenu ?
                        <SortList/>
                        : '' }
                </div>
            </SortByDiv>
        </FilterContainer>
    )
}
