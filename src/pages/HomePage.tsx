import GlobalStyled from '../styles/GlobalStyles'
import {Header} from "../components/Header/Header";
import {KeywordBanner} from "../components/KeywordBanner/KeywordBanner";
import {About} from "../components/About/About";
import {ListFilter} from "../components/ListFilter/ListFilter";
import {Container} from "../components/Container/Container";
import {Footer} from "../components/Footer/Footer";
import {QuestionCard} from "../components/QuestionCard/QuestionCard";
// import {motion} from "framer-motion";
import {HeaderMobile} from "../components/Header/HeaderMobile";
import {useState, useEffect, useDeferredValue} from 'react'
import {useMoralis} from "react-moralis";
import Pagination from '../components/Pagination/Pagination';

export interface filter{
  guessed:boolean;
  date:boolean;
  prize:boolean;
  attempts:boolean;
  my:boolean;
}

const HomePage = () => {
  const {Moralis, isInitialized} = useMoralis();
  const [pages, setPages] = useState<number>(0)
  const [allPages, setAllPages] = useState<number>(0);
  const [question, setQuestion] = useState<any>([])

  const [filter, setFilter] = useState<filter>({
    guessed:false,
    date:false,
    prize:false,
    attempts:false,
    my:false,
  })
  const filterDeferred = useDeferredValue(filter)
  const pagesDeferred = useDeferredValue(pages)

  useEffect(() => {
    async function getQuestions () {
       const Questions = Moralis.Object.extend("questions");
       const query = new Moralis.Query(Questions);
       filterDeferred.prize && query.descending("prize")
       filterDeferred.date && query.descending("date")
       filterDeferred.attempts && query.descending("attempt")
       query.equalTo("guessed", filterDeferred.guessed)
       filterDeferred.my && query.equalTo("user", Moralis.User.current())
       const objAll = await query
       .find();

       setAllPages(objAll.length)

       let obj:any = await query
       .limit(10)
       .skip(10 * pagesDeferred)
       .find()

       setQuestion(obj)
    }

    if(isInitialized) {
      getQuestions() 
    }
  }, [pagesDeferred, Moralis, isInitialized, filterDeferred])


    // <motion.div
    //     initial={{opacity: "0", x: "-1000px"}}
    //     animate={{opacity: "1", x: '0'}}
    //     exit={{opacity: "0", x: "-1000px"}}
    // >
  return (
    <>
                    { typeof window !== 'undefined'
                        ? window.innerWidth <= 555 ? <HeaderMobile/> : <Header/>
                        : ''
                    }
                    <Container>
                        <KeywordBanner/>
                        <About/>
                        <ListFilter
                          filter={filter}
                          setFilter={setFilter}
                        />
                        <div>
                          <QuestionCard question={question}/>
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Pagination 
                              pages={pages} 
                              setPages={setPages}
                              allPages={allPages}
                            />
                          </div>
                        </div>
                        <Footer/>
                    </Container>
                  <GlobalStyled/>
    </>  
  )
}

export default HomePage