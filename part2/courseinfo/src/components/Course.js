import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const reducer = (acc, current) => {
    console.log(acc, current)
    return {name: 'reducer', exercises: acc.exercises+current.exercises}
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce(reducer).exercises
    return(
      <p><strong>total of {sum} exercises</strong></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map( part=>
          <Part key={part.name} part={part} />
        )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

export default Course
