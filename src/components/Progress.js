import { useQuiz } from '../contexts/QuizContext'

function Progress() {
  const { index, numQuestions, sumPoints, points, answer } = useQuiz()
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {sumPoints}{' '}
      </p>
    </header>
  )
}

export default Progress
