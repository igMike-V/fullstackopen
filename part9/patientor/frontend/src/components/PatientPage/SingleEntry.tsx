import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const SingleEntry = ({ entry, diagnoses }: Props) => {
  console.log(diagnoses)

  const getDiagnosesCodes = (): JSX.Element | null => {
    if (!entry.diagnosisCodes) {
      return null;
    }
    const elements = entry.diagnosisCodes.map(code => {
      let diagnosis = diagnoses.find(d => d.code === code);
      if (diagnosis) {
        
        return (
          <li key={code}>{code} {diagnosis.name}</li>
        )
      } else {
        return (
          <li key={code}>{code} No matching diagnosis for code.</li>
        )
      }
      
    });

    return (
      <ul>{elements}</ul>
    ) 
    
  }

  return (
    <div className="single-entry">
      <p className="single-entry--description">
        {entry.date} {entry.description}
      </p>
      <div className="single-entry--codes">
        {getDiagnosesCodes()}
      </div>
    </div>
  )
}

export default SingleEntry;