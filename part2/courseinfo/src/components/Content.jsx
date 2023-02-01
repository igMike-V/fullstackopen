import React from "react"

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {
    const partContent = parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
    return (
        <div className="course-parts">
            {partContent}
        </div>
    )
}

export default Content
