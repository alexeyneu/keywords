import { BrowserRouter } from 'react-router-dom';
import RouterServices from './services/RouterServices';
import {AuthProvider} from './services/authProvider';
import {useMoralis} from 'react-moralis'
import { useEffect } from 'react';
import {useNotification} from 'web3uikit'
import {address} from './shared/variable'
import abi from './shared/lib/abi.json'
import {useState} from 'react'

function App() {
  // const [contract, setContract] = useState<any>(false);
  const {
    enableWeb3, 
    isAuthenticated, 
    isWeb3EnableLoading, 
    isWeb3Enabled,
    chainId,
  } = useMoralis()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  }, [isAuthenticated, isWeb3Enabled]);

  // useEffect(() => {
  //   async function getContract() {
  //     const ethers = Moralis.web3Library;
  //     const provider: any = await Moralis.enableWeb3()
  //     const Contract = new ethers.Contract(address, abi, provider);
  //     setContract(Contract)
  //   }

  //   getContract()
  // }, [Moralis])

  // useEffect(() => {
  //   const onIdNft = async (result: boolean) => {
  //     console.log(result)
  //   }

  //   if(contract) {
  //     contract.on('0x9235a5e910ea6592384cbc4a2ab363c0d5c79a2de98c12bd71b7ca99ac2cf686', onIdNft)
  //   }
    
  //   return () => {
  //     if(contract) {
  //       contract.off('0x9235a5e910ea6592384cbc4a2ab363c0d5c79a2de98c12bd71b7ca99ac2cf686', onIdNft)
  //     }
  //   }
  // }, [contract])

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <RouterServices/>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
