import * as React from "react"
import GlobalStyled from '../styles/GlobalStyles'
import {Header} from "../components/Header/Header";
import {KeywordBanner} from "../components/KeywordBanner/KeywordBanner";
import {About} from "../components/About/About";
import {ListFilter} from "../components/ListFilter/ListFilter";
import {Container} from "../components/Container/Container";
import {Footer} from "../components/Footer/Footer";
import {QuestionCard} from "../components/QuestionCard/QuestionCard";
import {AnimatePresence, motion} from "framer-motion";
import {HeaderMobile} from "../components/Header/HeaderMobile";
import {UseMatchMedia} from '../hooks/use-match-media';

const IndexPage = () => {

    const {isMobile} : any = UseMatchMedia();
  // @ts-ignore
    return (
      <motion.div
          initial={{opacity: "0", x: "-1000px"}}
          animate={{opacity: "1", x: '0'}}
          exit={{opacity: "0", x: "-1000px"}}
          transition={{type: 'spring', duraction: 1.5, bounce: 0.3}}
      >
                <main>
                    {isMobile ? <HeaderMobile/> : <Header/>}
                    <Container>
                        <KeywordBanner/>
                        <About/>
                        <ListFilter/>
                        <div>
                            <QuestionCard/>
                        </div>
                        <Footer/>
                    </Container>
                  <GlobalStyled/>
                </main>
      </motion.div>
  )
}

export default IndexPage
