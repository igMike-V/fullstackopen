import patients from '../../data/patients';
import { NonSensitivePatientEntry, Patient, NewPatientEntry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
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

const addEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const addEntry = {
    id: uuid(),
    ...entry
  }

  const updatePatent: Patient | undefined = patients.find(p => p.id == id);
  if (!updatePatent) {
    throw new Error('not found');
  }

  if (updatePatent.entries) {
    updatePatent.entries.push(addEntry);
  } else {
    updatePatent.entries = [addEntry];
  };

  patients.map(p => {
    if (p.id === id) {
      return updatePatent;
    }
    return p;
  })

  return updatePatent;
  
}

export default {
  getNonSensitiveEntries,
  getEntries,
  findById,
  addEntry,
  addPatient
}