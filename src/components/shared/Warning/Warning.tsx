import {
   Warning
} from './Warning.styled'

import {useMoralis} from 'react-moralis'

export const WarningComp = () => {
   const {chainId, isWeb3Enabled, isAuthenticated} = useMoralis()

   return(
      <>
         {chainId !== "0x4" && isWeb3Enabled &&
            <Warning>
               Change the network to rinkeby
            </Warning>
         }

         {!isAuthenticated &&
            <Warning>
               Please connect your wallet
            </Warning>
         }
      </>
   )
} 