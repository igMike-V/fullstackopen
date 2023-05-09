import  patientService  from '../../services/patients'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import Entries from './Entries';
import './index.css';
import { Button} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { ThemeProvider } from '@mui/material/styles';
import {hospitalTheme, healthCheckTheme, occupationalHealthTheme} from '../MUIstyles/buttons'
import EntryForm from './EntryForm';

export type FormType = 'hospital' | 'occupational' | 'health' | null;
type AnimateStates = 'open' | 'close';
interface FormSettings {
  type: FormType;
  show: boolean;
}


const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [formSettings, setFormSettings] = useState<FormSettings>({ type: null, show: false })
  const [formButtonAnimation, setFormButtonAnimation] = useState<AnimateStates>('close')
  const patientId = useParams<string>().id;
  console.log(patientId);
  
  useEffect(() => {
    const patientData = async (id: string) => {
      const request = await patientService.getPatient(id);
      if (request) {
        setPatient(request);
      }
    }
    if (patientId) {
      patientData(patientId);
    }
    
    return;
  }, [patientId])

  const setFormType = (formType: FormType) => {
    setFormSettings({ ...formSettings, type: formType });
  }

  const toggleForm = async () => {
    
    if (formSettings.show === true) {
      setFormButtonAnimation('close')
    await new Promise(r => setTimeout(r, 150))
      setFormSettings({type: null, show: false})
    } else {
      setFormButtonAnimation('open')
    await new Promise(r => setTimeout(r, 150))
      setFormSettings({...formSettings, show: true})
    }
  }

  if (!patientId) {
    return (<div>No Patient info, go back and try again.</div>);
  };

  if (!patient) {
    setTimeout(() => {
      if (!patient)
        return <div>{`Loading patient: ${patientId}...`}</div>
    }, 1000)
  };
  
  console.log(patient)
  if (patient) {
    return (
      <div>
        <div className="patient">
          <h2 className="patient-name">{patient.name}: </h2>
          <h4 className="patient-gender">({patient.gender})</h4>
        </div>
        <div className="patient-info">
          <p className="dob">Date of Birth:{patient.dateOfBirth}</p>
          <p className="ssn">ssn: {patient.ssn}</p>
          <p className="occupation">occupation: {patient.occupation}</p>
        </div>
        <h3>Add an entry</h3>
        <div className="patient-entries--buttons" >
           {formSettings.show ?
            <Button
              onClick={toggleForm}
              aria-label="cancel form input"
              startIcon={<CancelIcon />}
            >
              cancel
            </Button>

            : 
            <Button
              onClick={toggleForm}
              aria-label="show form buttons"
              startIcon={<NoteAddIcon />}
            >
              Start a new entry
            </Button>
          }
          {formSettings.show &&
            <div className={`form-type-buttons ${formButtonAnimation}`}>
              <ThemeProvider theme={healthCheckTheme} >
                <Button onClick={() => setFormType('health')} variant="contained" >
                  Health Check
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={occupationalHealthTheme} >
                <Button onClick={() => setFormType('occupational')} variant="contained" >
                  Occupational Health
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={hospitalTheme} >
                <Button onClick={() => setFormType('hospital')} variant="contained" >
                  Hospital
                </Button>
              </ThemeProvider>
            </div>
          } 
        </div>
        <EntryForm formType={formSettings.type} patientId={patientId} patient={patient} setPatient={setPatient} />
        <Entries entries={patient.entries} />
      </div>
    )
  } else {
    return <div>{`Loading patient: ${patientId}...`}</div>
  };
};

export default PatientPage;