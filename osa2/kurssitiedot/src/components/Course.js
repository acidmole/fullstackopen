const Course = ({ course }) => {
    return (
        <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p>
        <strong>Total of {sum} excersises </strong>
      </p>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }
    
  
  const Content = ({ parts }) => {
  
    return (
        <ul>
          {parts.map(part => 
          <Part key={part.id} part={part} />)}
        </ul>
    )  
  }

  export default Course