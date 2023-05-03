import { Entry } from "../../types";

interface Props {
  entry: Entry;
}

const Single = ({ entry }: Props) => {
  return (
    <div className="single-entry">
      <p className="single-entry--description">
        {entry.description}
      </p>
      <div className="single-entry--codes">
        <ul>
          {entry.diagnosisCodes && entry.diagnosisCodes.map(code => <li key={code}>{code}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Single;