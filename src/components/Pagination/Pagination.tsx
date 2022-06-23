import styled from "styled-components";

const PaginastionButton = styled.button`
   width: 48px;
   height: 48px;
   border-radius: 100%;
   background: rgba(106, 52, 255, 0.2);
   border: 1px solid rgba(255, 255, 255, 0.3);
   box-shadow: inset 0px 0px 16px 8px #BAA1FF;
   backdrop-filter: blur(46px);
   transform: matrix(-1, 0, 0, 1, 0, 0);
`

interface props {
   pages:number;
   setPages:React.Dispatch<React.SetStateAction<number>>;
   allPages:number;
}

const Pagination = ({ pages, setPages, allPages, }: props) => {

   const updatePages = (nameEvent: string) => () => {
      if(nameEvent === 'next') {
         pages + 1 < Math.ceil(allPages / 10) && setPages(pages + 1)
      } else {
         pages > 0 && setPages(pages - 1)  
      }
   }

   return (
        <div className="pagination" style={{display: 'flex', alignItems: 'center'}}>
            <PaginastionButton 
               onClick={updatePages('prev')}
               className="pagination__button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                     <path d="M5.78768 6.99986L0.822338 11.9652C0.487603 12.2999 0.487603 12.8426 0.822338 13.1774C1.15707 13.5121 1.69979 13.5121 2.03452 13.1774L7.60595 7.60595C7.94069 7.27122 7.94069 6.72851 7.60595 6.39377L2.03452 0.822341C1.69979 0.487605 1.15708 0.487605 0.82234 0.82234C0.487605 1.15708 0.487605 1.69979 0.82234 2.03452L5.78768 6.99986Z" fill="black"/>
                  </svg>
               </PaginastionButton>
               <div style={{display: 'flex'}}>
                  <p style={{ margin: '0 15px 0 15px'}}>{pages + 1}</p>
                  <p style={{ margin: '0 15px 0 15px'}}>{allPages}</p>
               </div>
            <PaginastionButton 
               onClick={updatePages('next')}
               className="pagination__button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                     <path d="M2.21232 6.99986L7.17766 11.9652C7.5124 12.2999 7.5124 12.8426 7.17766 13.1774C6.84293 13.5121 6.30021 13.5121 5.96548 13.1774L0.394049 7.60595C0.0593143 7.27122 0.0593142 6.72851 0.394049 6.39377L5.96548 0.822341C6.30021 0.487605 6.84292 0.487605 7.17766 0.82234C7.51239 1.15708 7.51239 1.69979 7.17766 2.03452L2.21232 6.99986Z" fill="black"/>
                  </svg>
               </PaginastionButton>
        </div>
   )
}

export default Pagination