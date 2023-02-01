import React from "react"
import Header from "./Header"
import Content from "./Content"



const Course = ({course}) => {
    const total = course.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <h4>Total of {total} exercises</h4>
        </div>
    )
}

export default Course
