import { Entry } from "../../types";
import DiagnosisDetail from "./DiagnosisDetail";


interface Props {
  entry: Entry;
}

const Diagnosis = ({ entry }: Props) => {

  const getDiagnosesCodes = (): JSX.Element | null => {
    if (!entry.diagnosisCodes) {
      return null;
    }
    const elements = entry.diagnosisCodes.map(code => {
      return <DiagnosisDetail key={code} code={code} />;
    });

    return (
      <ul>{elements}</ul>
    ) 
    
  }

  return (
    <div>
      <h3>Entries:</h3>
      {getDiagnosesCodes()}
    </div>
  )
}

export default Diagnosis;