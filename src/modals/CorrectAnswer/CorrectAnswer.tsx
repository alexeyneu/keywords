import * as React from 'react';
import styled from "styled-components";
import confett from '../../images/coffeti.png'
import eth from '../../images/eth.png';


interface props{
    prize: number;
}

const CreateWordMessage = styled.div`
    max-width: 56.7rem;
    width: 100%;
    margin: auto;
  
    h3, p{
      color: #fff;
    }
  
  p{
    margin: 1.6rem 0 6rem 0;
  }
  img{
    margin-bottom: 4.6rem;
    width: 215px;
    height: 162px;
  }
`

export const CorrectAnswer:React.FC<props> = ({prize}) => {
    return(
        <CreateWordMessage>
            <img src={confett} alt="" />
            <h3>Yoohoo.. Correct answer :)</h3>
            <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
            <p style={{fontSize: '48px'}}>{prize}</p> 
            <img src={eth} alt="" style={{width: '44px', height: '73px'}}/>
            </p>
        </CreateWordMessage>
    );
};
