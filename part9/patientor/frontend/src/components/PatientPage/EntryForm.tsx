import { useState, useEffect } from 'react';
import diagnosesService from "../../services/diagnoses";
import { FormType } from ".";
import patientService from '../../services/patients'
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button
} from "@mui/material";
import Alert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers";
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import {
  HealthCheckRating,
  EntryWithoutId,
  HealthCheckEntryWithoutId,
  HospitalEntryWithoutId,
  BaseEntryWithoutId,
  OccupationalHealthcareEntryWithoutId,
  Patient,
  Entry
} from '../../types';
import dayjs, { Dayjs } from 'dayjs';
dayjs().format()

interface EntryFormProps{
  formType: FormType;
  patientId: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

interface FormValues {
  description: string;
  date: Dayjs | null | undefined;
  specialist: string;
  diagnosisCodes: DiagnosisLookup[] | undefined;
  healthCheckRating?: HealthCheckRating | null;
  employerName?: string | null;
  assignLeave: boolean;
  sickLeave: FormSickLeave;
  discharge: FormDischarge;
}
interface FormSickLeave {
  startDate: Dayjs | null | undefined;
  endDate: Dayjs | null | undefined;
}
interface FormDischarge {
  date: Dayjs | null | undefined;
  criteria: string;
}

interface DiagnosisLookup {
  label: string;
  id: string;
}

const EntryForm = ({ formType, patientId, patient, setPatient }: EntryFormProps) => {
  const [codes, setCodes] = useState<DiagnosisLookup[]>([])
  const [alert, setAlert] = useState({
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const getCodes = async () => {
      const request = await diagnosesService.getAll();
      setCodes(request.map(r => {
        return {
          label: `${r.code} - ${r.name}`,
          id: r.code
        }
      }));
    }
    getCodes(); 
  }, [])

  const formReset = {
    description: '',
    date: dayjs(),
    specialist: '',
    diagnosisCodes: [],
    healthCheckRating: 0,
    employerName: '',
    assignLeave: false,
    sickLeave: {startDate: dayjs(), endDate: dayjs()},
    discharge: { date: dayjs(), criteria: ""}
  }
   
  const [form, setForm] = useState<FormValues>(formReset)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const dateToString = (date: Dayjs | null | undefined): string => {
    if (!date) {
      return '';
    }
    const year = date.year();
    const month = (date.month() + 1).toString().padStart(2, '0');
    const day = date.date().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
  const parseStringType = (entry: unknown, label: string): string => {
  if (!isString(entry)) {
    throw new Error(`Incorrect or missing ${label}: ${entry}`);
  };
  return entry;
}
  const extractDiagnosisCodes =(codes: DiagnosisLookup[] | undefined): string[] | undefined => {
    if (codes === undefined || codes.length === 0) {
      return undefined
    }
    const mapCodes = codes.map(c => {
      return c.id;
    })
    return mapCodes
  }

  const transformForm = (obj: FormValues): EntryWithoutId => {
    const baseEntry: BaseEntryWithoutId = {
      description: obj.description,
      date: dateToString(obj.date),
      specialist: obj.specialist,
      diagnosisCodes: extractDiagnosisCodes(obj.diagnosisCodes),
    }
    
    switch (formType) {
      case 'health':
        if (!obj.healthCheckRating) {
          throw Error('must supply healthCheckRating')
        }
        const healthEntry: HealthCheckEntryWithoutId = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: obj.healthCheckRating
        }
        return healthEntry;
      
      case 'hospital':
        const hospitalEntry: HospitalEntryWithoutId = {
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dateToString(obj.discharge.date),
            criteria: obj.discharge.criteria
          },
        };
        return hospitalEntry;
      case 'occupational':
        const occupationalEntry: OccupationalHealthcareEntryWithoutId = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: parseStringType(obj.employerName, 'employer name'),

        };
        if (obj.assignLeave && obj.sickLeave.startDate && obj.sickLeave.endDate) {
          occupationalEntry.sickLeave = {
            startDate: dateToString(obj.sickLeave.startDate),
            endDate: dateToString(obj.sickLeave.endDate)
          };
        }
        return occupationalEntry;
    }
    throw Error('Missing fields')
  }
  const cancelForm = () => {
    console.log('form reset');
  }

  const handleSubmit = async () => { 
    try {
      const newEntry = transformForm(form)
      const updatedPatientWithEntry: Patient = await patientService.createEntry(patientId, newEntry)
      setPatient(updatedPatientWithEntry)
      setAlert({message: `Added a new ${newEntry.type}`, type: 'info'})
       setTimeout(() => {
         setAlert({message: '', type: 'error' })
       }, 3000)

    } catch (error: any) {
     if (error instanceof Error) { // make sure it's an Error object
       console.log(error.message)
       setAlert({message: error.message, type: 'error'})
       setTimeout(() => {
         setAlert({message: '', type: 'error' })
       }, 3000)
      } else {
        console.log(error)
      }
    }
  }

  if (formType === null) {
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {alert.message && alert.type === 'error' && <Alert variant="filled" severity="error">{alert.message}</Alert> }
      {alert.message && alert.type === 'info' && <Alert variant="filled" severity="info">{alert.message}</Alert> }
      {formType === 'hospital' && <h3>New Hospital Record</h3>}
      {formType === 'occupational' && <h3>New Occupational Health Record</h3>}
      {formType === 'health' && <h3>New Healthcheck Record</h3>}
      <div className="new-entry-form">
        <FormControl className="form-block" fullWidth>
          <TextField
            label="Description"
            id="description"
            name="description"
            variant="outlined"
            value={form.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className='form-block' fullWidth>
          <DatePicker
            label="Date"
            value={form.date ? form.date : undefined}
            onChange={(newValue) => setForm({...form, date: newValue ? newValue : undefined}) }
          />
        </FormControl>
        
        <TextField
          label="Specialist"
          id="specialist"
          name="specialist"
          variant="outlined"
          value={form.specialist}
          fullWidth
          onChange={handleChange}
        />
        <Autocomplete
          multiple
          clearOnBlur
          clearOnEscape
          handleHomeEndKeys
          selectOnFocus
          id="diagnosisCodes"
          options={codes}
          onChange={(event: any, newValue: DiagnosisLookup[] | undefined) => {
            setForm({ ...form, diagnosisCodes: newValue });
          }}
          value={form.diagnosisCodes}
          renderInput={(params) => <TextField {...params} label="Diagnosis Codes" />}
        />
        {formType === 'health' &&
          <div className="form-healthcheck">
            <FormControl>
              <FormLabel id="healthCheckRating">Health Check Rating</FormLabel>
              <RadioGroup
                row
                aria-labelledby="healthCheckRating"
                name="healthCheckRating"
                value={form.healthCheckRating}
                onChange={handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="Healthy" />
                <FormControlLabel value="1" control={<Radio />} label="Low Risk" />
                <FormControlLabel value="2" control={<Radio />} label="High Risk" />
                <FormControlLabel value="3" control={<Radio />} label="Critical Risk" />
              </RadioGroup>
            </FormControl>
          </div>
        }
        {formType === 'occupational' &&
          <div className="form-occupational sub-form">
            <div className="form-row">
              <TextField
                label="Employer Name"
                id="employerName"
                name="employerName"
                variant="outlined"
                value={form.employerName}
                fullWidth
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
                <Typography component="label" endDecorator={<Switch checked={form.assignLeave} onChange={() => setForm({...form, assignLeave: !form.assignLeave})} sx={{ ml: 1 }} />}>
                  Assign sick leave
                </Typography>
              {form.assignLeave &&
                <div className="form-section">
                  <FormControl>
                    <DatePicker
                      label="Sick Leave Begin"
                      value={form.sickLeave.startDate ? form.sickLeave.startDate : undefined}
                      onChange={(newValue) => {
                        setForm({
                          ...form,
                          sickLeave: {
                            startDate: newValue ? newValue : undefined,
                            endDate: form.sickLeave.endDate
                          }
                        })
                      }}
                      
                    />
                  </FormControl>
                
                  <FormControl>
                    <DatePicker
                      label="Sick Leave End"
                      value={form.sickLeave.endDate ? form.sickLeave.endDate : undefined}
                      onChange={(newValue) => {
                        setForm({
                          ...form,
                          sickLeave: {
                            startDate: form.sickLeave.startDate,
                            endDate: newValue ? newValue : undefined
                          }
                        })
                      }}
                    />
                  </FormControl>
                </div>
              }
              </div>
          </div>
        }

        {formType === 'hospital' &&
          <div className="hospital">
            <div className="form-section">
              <FormControl fullWidth>
                <DatePicker
                  label="Discharge"
                  value={form.discharge.date ? form.discharge.date : undefined}
                  onChange={(newValue) => {
                    setForm({
                      ...form,
                      discharge: {
                        date: newValue ? newValue : undefined,
                        criteria: form.discharge.criteria
                      }
                    })
                  }}
                
                />
              </FormControl>
              <TextField
                label="Discharge Criteria"
                id="criteria"
                name="criteria"
                variant="outlined"
                value={form.discharge.criteria}
                fullWidth
                onChange={(e) => {
                  setForm({
                    ...form,
                    discharge: {
                      date: form.discharge.date,
                      criteria: e.target.value
                    }
                  })
                }}
              />
            </div>
          </div>
        }
        <div className="form-row">
          <Button color="error" onClick={() => cancelForm()} variant="contained" >
              Cancel
          </Button>
          <Button onClick={() => handleSubmit()} variant="contained" >
              Submit
          </Button>
        </div>
      </div>     

    </LocalizationProvider>
  );
}

export default EntryForm;
