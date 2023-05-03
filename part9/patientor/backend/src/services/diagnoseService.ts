import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getAll = (): Diagnosis[] => {
  return diagnoses;
};

const findByCode = (code: string): Diagnosis | undefined => {
  const request = diagnoses.find(d => d.code === code);
  return request;
}

export default {
  getAll, findByCode
}