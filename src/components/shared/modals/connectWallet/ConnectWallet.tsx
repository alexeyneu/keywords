import{
   ConnectModalUI,
   ModalWrap,
   DeleateModal,
   DeleateClose,
   ModalContent,
   ConnectTitle,
   ConnectorsBody,
   Connector,
   ConnectorText,
   ConnectorImg,
} from './ConnectWallet.styled'
import close from '../../../../assets/img/deleate.svg'
import {connectors, connector} from './config'
import {useMoralis} from "react-moralis";
import { useCallback, useRef } from "react"

interface props{
   setModal:React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConnectModal:React.FC<props> = ({setModal}) => {
   const {authenticate, logout, isAuthenticated} = useMoralis();

   const deleateBg = useRef<HTMLDivElement>(null);
   const deleate = useRef<HTMLImageElement>(null);

   type title = 'metamask' | 'walletConnect';
   const connectWallet = (connectorId:string, title:title) => async () => {

      try {
         if(!isAuthenticated) {
            await authenticate({ provider: title });
            window.localStorage.setItem("connectorId", connectorId);
            setModal(false);
         } else {
            await logout()
         }
      } catch (e) {
         console.error(e);
      }
   }

   const thisDeleateModal = useCallback((event:any) => {
      if(
         deleateBg.current !== null &&
         deleate.current !== null 
      ) {

         (event.target.className === deleate.current.className ||
         event.target.className === deleateBg.current.className) &&
         setModal(false);
      }

   }, [setModal, deleate, deleateBg])

   return(
      <ModalWrap 
         ref={deleateBg}
         onClick={(event: any) => thisDeleateModal(event)}
      >
         <ConnectModalUI>
            <DeleateModal>
               <DeleateClose>
                  <img 
                     alt="" src={close}
                     width="30%" height="30%" 
                     ref={deleate}
                     onClick={(event: any) => thisDeleateModal(event)}
                  />
               </DeleateClose>
            </DeleateModal>

            <ModalContent>
               <ConnectTitle>Connect Wallet</ConnectTitle>
               <ConnectorsBody>
               {connectors.map((values:connector, key) => (
                  <Connector
                     key={key}
                     onClick={connectWallet(values.connectorId, values.title === "Metamask" ? "metamask" : "walletConnect")}
                  >
                     <ConnectorImg src={values.icon} alt={values.title} />
                     <ConnectorText >{values.title}</ConnectorText>
                  </Connector>
               ))}
               </ConnectorsBody>
            </ModalContent>
         </ConnectModalUI>
      </ModalWrap>
   );
}