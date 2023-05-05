import { NewPatientEntry, Gender, EntryWithoutId, EntryType, Diagnosis, HealthCheckRating, HealthCheckEntryWithoutId, HospitalEntryWithoutId, Discharge, OccupationalHealthcareEntryWithoutId, SickLeave } from "./types";

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
  };
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  };
  return gender;
}

const parseStringType = (entry: unknown, label: string): string => {
  if (!isString(entry)) {
    throw new Error(`Incorrect or missing ${label}: ${entry}`);
  };
  return entry;
}

const isEntryType = (param: string): param is EntryType => {
  return ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(param)
}

const parseEntryType = (entry: unknown): EntryType => {
  if (!isString(entry)) {
    throw new Error('"type" should be a string');
  };
  if (!isEntryType(entry)) {
      throw new Error(`Error ${entry} is not an allowed type of Entry.`);
  };
  return entry
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
}

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) { 
    throw new Error(`Malformed sickLeave object.`);
  };
  const newSickLeave: SickLeave = {
    startDate: parseDate(object.startDate, 'startDate'),
    endDate: parseDate(object.endDate, 'endDate')
  };
  return newSickLeave;
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheckRating = (param: number): HealthCheckRating => {
  if (isNaN(param) || !(isHealthCheckRating(param))) {
    throw new Error('healthCheckRating missing from object.')
  }
  return param;

}

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' !in object)) {
    throw new Error('Discharge object malformed');
  };

  const newDischarge: Discharge = {
    date: parseDate(object.date, 'date'),
    criteria: parseStringType(object.criteria, 'criteria')
  };
  return newDischarge;
}

// Validation function for NewPatientEntry interface
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
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

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect, missing data.');
  }
  if ('type' in object) {
    
  }
  // Test Generic type
  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
    // Test each field of the base entry
    switch( parseEntryType(object.type) ) {
      case "HealthCheck":
        if ('healthCheckRating' in object) {
          const newEntry: HealthCheckEntryWithoutId = {
            description: parseStringType(object.description, 'description'),
            date: parseDate(object.date, 'date'),
            specialist: parseStringType(object.specialist, 'specialist'),
            type: "HealthCheck",
            diagnosisCodes: parseDiagnosisCodes(object),
            healthCheckRating: parseHealthCheckRating(Number(object.healthCheckRating))
          };
          return newEntry;
        } else {
          throw new Error('HealthCheck Entry type missing "healthCheckRating"')
        }
        break;
      case "Hospital":
        if ('discharge' in object) {
          const newEntry: HospitalEntryWithoutId = {
            description: parseStringType(object.description, 'description'),
            date: parseDate(object.date, 'date'),
            specialist: parseStringType(object.specialist, 'specialist'),
            type: "Hospital",
            diagnosisCodes: parseDiagnosisCodes(object),
            discharge: parseDischarge(object.discharge)
          };
          return newEntry;
        } else {
          throw new Error('Hospital Entry type missing "discharge"')
        }
        break
      case "OccupationalHealthcare":
        if ('employerName' in object) {
          const newEntry: OccupationalHealthcareEntryWithoutId = {
            description: parseStringType(object.description, 'description'),
            date: parseDate(object.date, 'date'),
            specialist: parseStringType(object.specialist, 'specialist'),
            type: "OccupationalHealthcare",
            diagnosisCodes: parseDiagnosisCodes(object),
            employerName: parseStringType(object.employerName, 'Employer Name')
          };
          if ('sickLeave' in object) {
            newEntry.sickLeave = parseSickLeave(object.sickLeave);
          }
          return newEntry;
        } else {
          throw new Error('Hospital Entry type missing "discharge"')
        }
        break
      default:
        throw new Error('unacceptable type')
    }
  }
  throw new Error('Incorrect data: some fields are missing');
}
