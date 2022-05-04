import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import {useAppDispatch} from '../../store/hooks';
import {setUser} from '../../store/sliced/user/user.sliced'

interface props {
   children:React.ReactNode;
}

export const AuthProvider = ({children}: props) => {
   const dispatch = useAppDispatch();
   const {user, isInitializing} = useMoralis();

   useEffect(() => {
      if(isInitializing) {
         dispatch(setUser(user?.attributes.ethAddress));
      }
   }, [user, dispatch, isInitializing])

   return(
      <>
         {children}
      </>
   )
}