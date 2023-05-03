
import { HospitalEntry, Discharge } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Diagnoses from "./Diagnosis";

interface Props {
  entry: HospitalEntry;
}

interface DischargeProps {
  discharge: Discharge;
}

const DischargeSection = ({discharge}: DischargeProps) => {
  return (
    <div className="single-entry--discharge">
      <h4>Discharge:</h4>
      {discharge.date}: {discharge.criteria}
    </div>
  )
}

const HospitalEntrySection = ({ entry }: Props) => {
  return (
    <div className="single-entry">
      <div className="single-entry--icon">
        <LocalHospitalIcon  style={{ color: 'white' }}  /> 
        <div className="single-entry--icon-date">
          {entry.date}
        </div>
      </div>
      <div className="single-entry--content">
        <div className="single-entry--description">
          {entry.description}
        </div>
        <div className="single-entry--diagnosis">
          {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 ? <Diagnoses entry={entry}/> : 'No current Diagnosis'}
        </div>

        {entry.discharge && <DischargeSection discharge={entry.discharge} />}

        <div className="single-entry--specialist">
          Diagnosis by {entry.specialist}
        </div>
      </div>
       
    </div>
  )
}

export default HospitalEntrySection;