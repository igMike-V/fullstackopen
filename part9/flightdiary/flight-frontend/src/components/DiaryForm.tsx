import { useState } from "react";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../interfaces";
import { createEntry } from "../services/diaryService";

interface DiaryFormProps {
  entries: NonSensitiveDiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const resetDiaryForm = ():NewDiaryEntry => {
  return {
    date: '',
    visibility: '',
    weather: '',
    comment: '',
  }
} 

const DiaryForm = (props:DiaryFormProps) => {
  const [formData, setFormData] = useState<NewDiaryEntry>(resetDiaryForm());
  
  const createDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry(formData).then(res => {
      const newEntries: NonSensitiveDiaryEntry[] = [...props.entries, res];
      props.setEntries(newEntries);
    }).catch(error => console.log(error))

  }

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.currentTarget.name]: event.currentTarget.value})
  }

  return (
    <section className="diaryform">
      <form onSubmit={createDiaryEntry}>
        <div className="form-input">
          <label>date:</label>
          <input
            name="date"
            value={formData.date}
            onChange={(event) => updateForm(event)} 
          />
        </div>
        <div className="form-input">
          <label>visibility:</label>
          <input
            name="visibility"
            value={formData.visibility}
            onChange={(event) => updateForm(event)} 
          />
        </div>
        <div className="form-input">
          <label>weather:</label>
          <input
            name="weather"
            value={formData.weather}
            onChange={(event) => updateForm(event)} 
          />
        </div>
        <div className="form-input">
          <label>comment:</label>
          <input
            name="comment"
            value={formData.comment}
            onChange={(event) => updateForm(event)} 
          />
        </div>
        <button type="submit">add</button>
      </form>
    </section>
  )
}

export default DiaryForm

