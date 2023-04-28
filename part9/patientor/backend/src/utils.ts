import { NewPatientEntry, Gender } from "./types";

// Validation of types
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

// Parser functions for fields
const parseDate = (date: unknown, label: string): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${label}: ${date}`);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
}

const parseStringType = (entry: unknown, label: string): string => {
  if (!isString(entry)) {
    throw new Error(`Incorrect or missing ${label}: ${entry}`);
  }
  return entry;
}

// Validation function for NewPatientEntry interface
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect, missing data.');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseStringType(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth, 'date of birth'),
      ssn: parseStringType(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseStringType(object.occupation, 'occupation')
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
}

export default(toNewPatientEntry)