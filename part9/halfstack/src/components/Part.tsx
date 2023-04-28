import { CoursePart } from "../types";
import './Part.css'

interface PartProps {
  coursePart: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part = (props: PartProps) => {
  switch (props.coursePart.kind) {
    case "basic":
      return (
        <div className="course">
          <h3 className="course--heading">{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <p className="course--description">{props.coursePart.description}</p>
        </div>
      );
    case "group":
      return (
        <div className="course">
          <h3 className="course--heading">{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <p className="course--projectCount">Group projects: {props.coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div className="course">
          <h3 className="course--heading">{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <p className="course--description">{props.coursePart.description}</p>
          <p className="course--bgmaterial">Background materials: {props.coursePart.backgroundMaterial}</p>
        </div>
      )
    case "special":
       return (
        <div className="course">
          <h3 className="course--heading">{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
          <p className="course--description">{props.coursePart.description}</p>
          <p className="course--Requirements">Required Skills: {props.coursePart.requirements.join(', ')}</p>
         </div>
       )
    default:
      return assertNever(props.coursePart)
  }
}

export default Part;