function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h4> {numQuestions} questions to test your React mastery</h4>
      <button className="btn btn-ui">Let's start</button>
    </div>
  )
}

export default StartScreen