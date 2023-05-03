import { Entry } from "../../types"
import SingleEntry from './SingleEntry';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  
  console.log(entries)
  return (
    <div className="patient-entries">
      {entries.length === 0 ? <h3>No entries found</h3> : <h3>entries</h3>}
      {entries.map(entry => <SingleEntry key={entry.id} entry={entry} />)}
      <div className="patient-entries--button" >
        <Button component={Link} to="/" variant="contained" color="primary">
          Add New Entry
        </Button>
      </div>
    </div>
  )


}

export default Entries