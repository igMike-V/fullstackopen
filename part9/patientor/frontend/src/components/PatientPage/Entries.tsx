import { Entry } from "../../types"
import Single from './Single';

interface Props {
  entries: Entry[]
}

const Entries = ({ entries }: Props) => {
  if (!entries) return <>'No entries yet'</>;
  
  return (
    <div className="patient-entries">
      <h3>entries</h3>
      {entries.map(entry => <Single key={entry.id} entry={entry} />)}
    </div>
  )


}

export default Entries