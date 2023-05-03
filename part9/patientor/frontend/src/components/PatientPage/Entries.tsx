import { Diagnosis, Entry } from "../../types"
import SingleEntry from './SingleEntry';

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const Entries = ({ entries, diagnoses }: Props) => {
  if (entries.length === 0) return <h3>No entries found</h3>;
  
  return (
    <div className="patient-entries">
      <h3>entries</h3>
      {entries.map(entry => <SingleEntry key={entry.id} entry={entry} diagnoses={diagnoses} />)}
    </div>
  )


}

export default Entries