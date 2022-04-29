import { 
   BodyAccount,
   Title,
   ChangeEvent,
} from "../Kabinet.styled"

import {useAppSelector} from '../../../../store/hooks';

export const AccountComp = () => {
   const user = useAppSelector(state => state.user);
   console.log(user)

   return(
      <BodyAccount>
         <Title>Address account: {user.address}</Title>
         <Title>Balance account: {user.balance}</Title>

         <ChangeEvent>Show all questions</ChangeEvent>
         <ChangeEvent>Show my questions</ChangeEvent>
         <ChangeEvent>Show guessed questions</ChangeEvent>
      </BodyAccount>
   );
}
