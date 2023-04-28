import patients from '../../data/patients';
import { NonSensitivePatientEntry, Patient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry
}

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
}

export default {
  getNonSensitiveEntries,
  getEntries,
  findById,
  addPatient
}