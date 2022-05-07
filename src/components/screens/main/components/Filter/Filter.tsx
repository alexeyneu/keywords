import {
   BodyFilter,
   FilterType,
   FilterTypeTitle,
   Filtertext,
} from "../../Main.styled"
import {useCallback} from 'react'
import {filter} from '../../Main'

interface Props {
   filter:filter;
   setFilter:React.Dispatch<React.SetStateAction<filter>>;
}

export const Filter = ({filter, setFilter}:Props) => {
   const onFilter = useCallback((state:any) => () => {
      setFilter((statePrev:filter) => {
         return {
            ...statePrev,
            ...state,
         }
      })
   }, [setFilter])

   return(
      <BodyFilter>
         <FilterType>
            <FilterTypeTitle>Questions: </FilterTypeTitle>
               
            <Filtertext isChecked={!filter.guessed && !filter.my} >all |</Filtertext>
               
            <Filtertext 
               isChecked={filter.guessed}
               onClick={onFilter({guessed:!filter.guessed})}
            >guesse |</Filtertext>

            <Filtertext 
               isChecked={filter.my}
               onClick={onFilter({my:!filter.my})}
            >my</Filtertext>
         </FilterType>

         <FilterType>
            <FilterTypeTitle>Sort by: </FilterTypeTitle>

            <Filtertext 
               isChecked={filter.date}
               onClick={onFilter({date:!filter.date})}
            >date |</Filtertext>

            <Filtertext 
               isChecked={filter.prize}
               onClick={onFilter({prize:!filter.prize})}
            >prize |</Filtertext>

            <Filtertext  
               isChecked={filter.attempts}
               onClick={onFilter({attempts:!filter.attempts})}
            >attempts</Filtertext>
         </FilterType>
      </BodyFilter>
   )
}