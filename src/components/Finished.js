function Finished({ points, sumPoints, highscore, dispatch }) {
  const percentage = (points / sumPoints) * 100
  let emoji
  if (percentage === 100) emoji = '🏆'
  if (percentage >= 80 && percentage <= 50) emoji = '🎉'
  if (percentage >= 50 && percentage <= 20) emoji = '🤨'
  if (percentage < 20) emoji = '😥'
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {sumPoints}{' '}
        {Math.ceil(percentage)}% {emoji}
      </p>
      <p className="highscore">(highscore is {highscore} points)</p>
      <button
        onClick={() => dispatch({ type: 'restart' })}
        className="btn btn-ui"
      >
        Restart the quiz
      </button>
    </>
  )
}

export default Finished
