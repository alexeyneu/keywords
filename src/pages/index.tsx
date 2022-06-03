import * as React from "react"
import GlobalStyled from '../styles/GlobalStyles'
import {Header} from "../components/Header/Header";
import {KeywordBanner} from "../components/KeywordBanner/KeywordBanner";
import {About} from "../components/About/About";
import {ListFilter} from "../components/ListFilter/ListFilter";
import {Container} from "../components/Container/Container";
import {Footer} from "../components/Footer/Footer";
import {QuestionCard} from "../components/QuestionCard/QuestionCard";
import BG_CARD from '../images/bg_card.png'

const IndexPage = () => {
  return (
    <main>
        <Header/>
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
  )
}

export default IndexPage
