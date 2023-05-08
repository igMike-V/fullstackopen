import { useState, useEffect } from 'react';
import diagnosesService from "../../services/diagnoses";
import { FormType } from ".";
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

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers";
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { HealthCheckRating, EntryWithoutId, Diagnosis} from '../../types';
import dayjs, { Dayjs } from 'dayjs';
dayjs().format()

interface EntryFormProps{
  formType: FormType;
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

const EntryForm = ({ formType }: EntryFormProps) => {
  const [codes, setCodes] = useState<DiagnosisLookup[]>([])

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
   
  const [form, setForm] = useState<FormValues>({
    description: '',
    date: dayjs(),
    specialist: '',
    diagnosisCodes: [],
    healthCheckRating: 0,
    employerName: '',
    assignLeave: false,
    sickLeave: {startDate: dayjs(), endDate: dayjs()},
    discharge: { date: dayjs(), criteria: ""}
  })

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
  
  const extractDiagnosisCodes =(codes: DiagnosisLookup[]): string[] | undefined => {
    if (codes === undefined || codes.length === 0) {
      return undefined
    }
    const mapCodes = codes.map(c => {
      return c.id;
    })
    return mapCodes
  }

  const transformForm = (obj: FormValues): EntryWithoutId => {
    switch (formType) {
      case 'health': {
        const healthEntry: EntryWithoutId = {
          description: obj.description,
          date: dateToString(obj.date),
          specialist: obj.specialist,
          diagnosisCodes: extractDiagnosisCodes(obj.diagnosisCodes)
        }
      } 
    }
  }
  const cancelForm = () => {
    console.log('form reset');
  }

  const handleSubmit = () => { 
    console.log(transformForm(form))
  }

  if (formType === null) {
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
