import './App.css';
import { Router } from './providers/router/router';
import { AuthProvider } from './providers/authProvider/authProvider';
import {useAppSelector} from './store/hooks'
import { ErrorModal } from './components/shared/modals/error/Error';
import {HeaderComp} from './components/shared/Header/Header'
import { WarningComp } from './components/shared/Warning/Warning';
import { SuccessModal } from './components/shared/modals/success/Success';
import {useMoralis} from 'react-moralis'
import { useEffect } from 'react';

function App() {
  const {message} = useAppSelector(state => state.error)
  const {messageSuccess} = useAppSelector(state => state.success)
  
  const {
    enableWeb3, 
    isAuthenticated, 
    isWeb3EnableLoading, 
    isWeb3Enabled
  } = useMoralis()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <AuthProvider>
      {message.length > 0 &&
        <ErrorModal message={message} />
      }

      {messageSuccess.length > 0 &&
        <SuccessModal message={messageSuccess} />
      }

      <HeaderComp />
      <WarningComp />

      <Router />
    </AuthProvider>
  );
}

export default App;
