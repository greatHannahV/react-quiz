// import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import Progress from './Progress'
import Finished from './Finished'
import Footer from './Footer'
import NextButton from './NextButton'
import Timer from './Timer'
import { useQuiz } from '../contexts/QuizContext'

function App() {
  const { status } = useQuiz()
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <Finished />}
      </Main>
    </div>
  )
}

export default App
