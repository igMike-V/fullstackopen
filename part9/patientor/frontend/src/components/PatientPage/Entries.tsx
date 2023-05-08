import { Entry } from "../../types"
import SingleEntry from './SingleEntry';

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  return (
    <div className="patient-entries">
      {entries.length === 0 ? <h2>No entries found</h2> : <h2>Entries</h2>}
      {entries.map(entry => <SingleEntry key={entry.id} entry={entry} />)}
    </div>
  )


}

export default Entries