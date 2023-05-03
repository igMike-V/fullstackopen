
import { OccupationalHealthcareEntry, SickLeave } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Diagnoses from "./Diagnosis";

interface Props {
  entry: OccupationalHealthcareEntry;
}

interface SickLeaveProps {
  sickLeave: SickLeave;
}

const SickLeaveSection = ({sickLeave}: SickLeaveProps) => {
  return (
    <div className="single-entry--sickLeave">
      <h4>sickLeave:</h4>
      {sickLeave.startDate} - {sickLeave.endDate}
    </div>
  )
}

const OccupationalHealthcareEntrySection = ({ entry }: Props) => {
  return (
    <div className="single-entry single-entry-occupational">
      <div className="single-entry--icon single-entry--icon-occupational">
        <MedicalServicesIcon  style={{ color: 'white' }}  /> 
        <div className="single-entry--icon-date">
          {entry.date}
        </div>
        <div className="single-entry--icon-">
          {entry.employerName}
        </div>
      </div>
      <div className="single-entry--content">
        <div className="single-entry--description">
          {entry.description}
        </div>
        <div className="single-entry--diagnosis">
          {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 ? <Diagnoses entry={entry}/> : 'No current Diagnosis'}
        </div>

        {entry.sickLeave && <SickLeaveSection sickLeave={entry.sickLeave} />}

        <div className="single-entry--specialist">
          Diagnosis by {entry.specialist}
        </div>
      </div>
       
    </div>
  )
}

export default OccupationalHealthcareEntrySection;