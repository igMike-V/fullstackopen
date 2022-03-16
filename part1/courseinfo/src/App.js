const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
   
    </div>
  )
}

const Content = (props) => {
  return(
  <div>
       <Part />
       <Part />
       <Part />
  </div>
  )
}

const Total = (props) => {
  return(
  <div>
     <p>Number of exercises {props.totalEx}</p>
  </div>
  )
}
const Part = (props) =>{
  return(
    <>
    <p>
    {props.part} {props.number}
    </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return(
    <div>
      <Header course={course} />
      <Content  part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}  />
      <Total totalEx={exercises1 + exercises2 + exercises3} />
      
    </div>
  )
}
export default App;
