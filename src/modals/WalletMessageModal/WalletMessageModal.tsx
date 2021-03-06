import styled from "styled-components";
import metamask from '../../images/metamask.png';
import walletConnect from '../../images/walletconnect.png';
import {useMoralis} from 'react-moralis'

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
  svg{
    margin-bottom: 4.6rem;
  }
`

const WayConnectWallet = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: center;
  
  div{
    margin: 7.2rem 0;
    &:first-child{
      margin-right: 4.8rem;
    }
    img{
      width: 5.6rem;
      height: 5.6rem;
      margin: auto;
      cursor: pointer;
    }
  }
`

export const WalletMessageModal = ({setStatus}: {setStatus: (value: React.SetStateAction<string | number>) => void}) => {
  const {Moralis, authenticate} = useMoralis(); 
    return(
        <CreateWordMessage>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.8616 8.28564C39.2789 8.28564 40.5276 8.52679 41.8278 9.22214C43.0327 9.86653 43.9907 10.8245 44.6351 12.0294C45.2929 13.2593 45.5442 14.4432 45.5695 16.6138C47.32 16.7262 48.4346 17.0316 49.5837 17.6462C50.9574 18.3808 52.0479 19.4713 52.7825 20.845C53.5804 22.337 53.8573 23.7709 53.8573 26.6091V39.6764C53.8573 42.5147 53.5804 43.9486 52.7825 45.4406C52.0479 46.8143 50.9574 47.9047 49.5837 48.6394C48.0917 49.4373 46.6578 49.7142 43.8196 49.7142H14.1809C11.3426 49.7142 9.90871 49.4373 8.4167 48.6394C7.04302 47.9047 5.95255 46.8143 5.2179 45.4406C4.41996 43.9486 4.14307 42.5147 4.14307 39.6764V16.5714H4.14721L4.14744 16.458C4.18285 14.386 4.4377 13.2296 5.07956 12.0294C5.72395 10.8245 6.68195 9.86653 7.88685 9.22214C9.18705 8.52679 10.4358 8.28564 12.8531 8.28564H36.8616ZM43.8196 20.7142H8.28592V39.6764C8.28592 41.8893 8.43805 42.677 8.87113 43.4868C9.21967 44.1385 9.71875 44.6376 10.3705 44.9862C11.1802 45.4192 11.968 45.5714 14.1809 45.5714H43.8196C46.0324 45.5714 46.8202 45.4192 47.6299 44.9862C48.2817 44.6376 48.7807 44.1385 49.1293 43.4868C49.5624 42.677 49.7145 41.8893 49.7145 39.6764V26.6091C49.7145 24.3963 49.5624 23.6085 49.1293 22.7988C48.7807 22.147 48.2817 21.648 47.6299 21.2994C46.8202 20.8663 46.0324 20.7142 43.8196 20.7142ZM41.4288 31.0714C42.5728 31.0714 43.5002 31.9988 43.5002 33.1428C43.5002 34.2868 42.5728 35.2142 41.4288 35.2142H37.2859C36.1419 35.2142 35.2145 34.2868 35.2145 33.1428C35.2145 31.9988 36.1419 31.0714 37.2859 31.0714H41.4288ZM36.8616 12.4285H12.8531C11.0612 12.4285 10.4586 12.5449 9.84062 12.8754C9.35769 13.1336 8.99106 13.5003 8.73279 13.9832C8.42987 14.5496 8.30683 15.1031 8.28841 16.5714H41.4263C41.4079 15.1031 41.2848 14.5496 40.9819 13.9832C40.7236 13.5003 40.357 13.1336 39.8741 12.8754C39.2561 12.5449 38.6535 12.4285 36.8616 12.4285Z" fill="#A87D55"/>
            </svg>
            <h3>Please connect your wallet</h3>
            <WayConnectWallet>
                <div onClick={async () => {
                  await authenticate()
                  setStatus(' ')
                }}>
                    <img src={metamask} alt={'metamask'}/>
                    <p>Metamask</p>
                </div>
                <div onClick={async () => {
                  await Moralis.authenticate({provider: "walletconnect", chainId:4})
                  setStatus(' ')
                }}>
                    <img src={walletConnect} alt={'walletconnect'}/>
                    <p>WalletConnect</p>
                </div>
            </WayConnectWallet>
        </CreateWordMessage>
    );
};
