import React from "react"
import Part from "./Part"

const Content = ({ parts }) => {
    const partContent = parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
    return (
        <div className="course-parts">
            {partContent}
        </div>
    )
}

export default Content
