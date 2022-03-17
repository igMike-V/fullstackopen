const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
   
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return(
  <div>
       <Part part={props.parts[0]} />
       <Part part={props.parts[1]} />
       <Part part={props.parts[2]} />
  </div>
  )
}

const Part = (props) => {
  return(
    <>
    <p>
      {props.part.name} {props.part.exercises}
    </p>
    </>
  )
} 

const Total = (props) => {
  return(
  <div>
     <p>Number of exercises {props.totalEx}</p>
  </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name:  'Fundamentals of React',
      exercises: 10
    },
    {
      name:  'using props to pass data',
      exercises: 7
    },
    {
      name:  'State of a component',
      exercises: 14
    }
  ]
  return(
    <div>
      <Header course={course} />
      <Content  parts={parts} />
      <Total totalEx={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
      
    </div>
  )
}
export default App;
