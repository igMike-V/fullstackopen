import  patientService  from '../../services/patients'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import './index.css'

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
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

  if (!patientId) {
    return (<div>No Patient info, go back and try again.</div>);
  }
  if (!patient) {
    setTimeout(() => {
      if (!patient)
        return <div>{ `Loading patient: ${patientId}...` }</div>
     }, 1000)
  }
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
      </div>
    )
  } else {
     return <div>{ `Loading patient: ${patientId}...` }</div>
  }
}

export default PatientPage;