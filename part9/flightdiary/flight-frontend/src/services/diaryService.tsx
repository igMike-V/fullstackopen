import axios from "axios";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../interfaces";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
    const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
    return response.data;
}

export const createEntry = async (newDiaryEntry: NewDiaryEntry) => {
  const response = await axios.post(baseUrl, newDiaryEntry);
  if (response) {
    return response.data;
  }
}