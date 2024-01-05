import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import Finished from './Finished'

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
}
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }
    case 'start':
      return {
        ...state,
        status: 'active',
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case 'restart':
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
      }

    default:
      throw new Error('Action unknown')
  }
}
function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState)
  const numQuestions = questions.length
  const sumPoints = questions.reduce((prev, cur) => prev + cur.points, 0)
  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              points={points}
              numQuestions={numQuestions}
              sumPoints={sumPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === 'finished' && (
          <Finished
            points={points}
            sumPoints={sumPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App
