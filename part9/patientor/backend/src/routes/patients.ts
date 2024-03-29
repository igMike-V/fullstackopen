import express from 'express';
import patientService from '../services/patientService';
import { EntryWithoutId, Patient } from '../types';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries())
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {

  //TODO Add an entry to a patient
  const patientId = req.params.id
  const newEntry: EntryWithoutId = toNewEntry(req.body);
  try {
    const updatedPatient: Patient | undefined = patientService.addEntry(patientId, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`
    }
    res.status(400).send(errorMessage);
  }
});

export default router;