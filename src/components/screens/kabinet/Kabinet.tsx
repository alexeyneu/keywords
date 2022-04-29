import { useState } from "react";
import { 
   Container,
   Body,
   BodyChange,
   ChangeBtn,
} from "./Kabinet.styled"

import {AccountComp} from './components/Account'
import { ConnectComp } from "./components/Connect";

const KabinetComp = () => {
   const [change, setChange] = useState('Account')

   return(
      <Container>
         <Body>
            <BodyChange>
               <ChangeBtn 
                  onClick={() => {setChange('Account')}}
                  change={change === 'Account' }
               >Account</ChangeBtn>
               <ChangeBtn
                  onClick={() => {setChange('Connect')}}
                  change={change === 'Connect' }
               >Connect</ChangeBtn>
            </BodyChange>

            {change === 'Account' ? 
               <AccountComp />
               :
               <ConnectComp />
            }
         </Body>
      </Container>
   );
}

export default KabinetComp;