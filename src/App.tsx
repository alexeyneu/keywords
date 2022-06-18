import { BrowserRouter } from 'react-router-dom';
import RouterServices from './services/RouterServices';
import {AuthProvider} from './services/authProvider';
import {useMoralis} from 'react-moralis'
import { useEffect } from 'react';
import {useNotification} from 'web3uikit'

function App() {
  const dispatchNotification = useNotification();
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

  useEffect(() => {

    // if(!isWeb3Enabled) {
    //     dispatchNotification({
    //         type: 'error',
    //         message: 'Connect a wallet',
    //         title: 'Error',
    //         icon: "info",
    //         position:'topR',
    //     });
    //     return
    // }

    if(chainId !== '0x4') { // rinkeby
        dispatchNotification({
          type: 'error',
          message: 'Switch to the rinkeby network',
          title: 'Error',
          icon: "info",
          position:'topR',
        });
    }
  }, [isWeb3Enabled, chainId])

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <RouterServices/>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
