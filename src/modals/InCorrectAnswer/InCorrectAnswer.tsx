import styled from "styled-components";
import error from '../../images/error.png'

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
    width: 49px;
    height: 49px;
  }

  button{
    width: 152px;
    height: 52px;
    background: #6A34FF;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: inset 0px 0px 16px #BAA1FF;
    backdrop-filter: blur(46px);
    border-radius: 16px;
    margin-top:24px;

    font-family: 'Untitled Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.08em;
    color: #FFFFFF;
  }
`

export const InCorrectAnswer = ({onClick}: {onClick?: () => any;}) => {
    return(
        <CreateWordMessage>
            <img src={error} alt="" />
            <h3>Oops.. Incorrect answer :(</h3>
            <button onClick={onClick}>TRY AGAIN</button>
        </CreateWordMessage>
    );
};
