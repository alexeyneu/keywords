

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
        <div>
            <button 
               onClick={updatePages('prev')}
               className="pagination__button">Previous</button>
            Page
            <button className="pagination__button">{pages + 1}</button>
            of {Math.ceil(allPages / 10)}
            <button 
               onClick={updatePages('next')}
               className="pagination__button">Next</button>
        </div>
   )
}

export default Pagination