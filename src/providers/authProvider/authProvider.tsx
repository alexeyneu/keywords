import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import {useAppDispatch} from '../../store/hooks';
import {setUser} from '../../store/user/user.sliced'

interface props {
   children:React.ReactNode;
}

export const AuthProvider = ({children}: props) => {
   const dispatch = useAppDispatch();
   const {Moralis, isInitializing} = useMoralis();

   useEffect(() => {
      if(isInitializing) {
         const user = Moralis.User.current()
         dispatch(setUser(user?.attributes.ethAddress));
      }
   }, [Moralis, dispatch, isInitializing])

   return(
      <>
         {children}
      </>
   )
}