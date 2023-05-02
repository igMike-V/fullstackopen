import { useState } from "react";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../interfaces";
import { createEntry } from "../services/diaryService";
import axios from 'axios';

interface DiaryFormProps {
  entries: NonSensitiveDiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  setMessage: (value: string) => void;
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
  
  const createDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = await createEntry(formData)
      if (newEntry) {
        const newEntryState = [...props.entries, newEntry];
        props.setEntries(newEntryState);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          props.setMessage(error.response.data)
        }         
      } else {
        props.setMessage('Oops... Something went wrong try again.')
      }
    }
  }

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value })
    console.log(formData)
  }

  return (
    <section className="diaryform">
      <form onSubmit={createDiaryEntry}>
        <div className="form-input">
          <label>date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={updateForm} 
          />
        </div>

        <div className="form-input">
          <label>Weather</label>
          <div className="radio-buttons">
            <div className="radio">
              <input
                type="radio"
                name="weather"
                value="sunny"
                id="sunny"
                checked={formData.weather === 'sunny'}
                onChange={updateForm} 
              />
              <label htmlFor="sunny">Sunny</label>
            </div>
            
            <div className="radio">
              <input
                type="radio"
                name="weather"
                value="rainy"
                id="rainy"
                checked={formData.weather === 'rainy'}
                onChange={updateForm} 
              />
              <label htmlFor="rainy">Rainy</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                name="weather"
                value="cloudy"
                id="cloudy"
                checked={formData.weather === 'cloudy'}
                onChange={updateForm} 
              />
              <label htmlFor="cloudy">Cloudy</label>
            </div>
            
            <div className="radio">
              <input
                type="radio"
                name="weather"
                value="stormy"
                id="stormy"
                checked={formData.weather === 'stormy'}
                onChange={updateForm} 
              />
              <label htmlFor="stormy">Stormy</label>
            </div>
            
            <div className="radio">
              <input
                type="radio"
                name="weather"
                value="windy"
                id="windy"
                checked={formData.weather === 'windy'}
                onChange={updateForm} 
              />
              <label htmlFor="windy">Windy</label>
            </div>

          </div>
        </div>

        <div className="form-input">
          <label>Visibility:</label>
          <div className="radio-buttons">
            <div className="radio">
              <input
                type="radio"
                name="visibility"
                value="great"
                id="great"
                checked={formData.visibility === 'great'}
                onChange={updateForm} 
              />
              <label htmlFor="great">Great</label>
            </div>
            
            <div className="radio">
              <input
                type="radio"
                name="visibility"
                value="good"
                id="good"
                checked={formData.visibility === 'good'}
                onChange={updateForm} 
              />
              <label htmlFor="good">Good</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                name="visibility"
                value="ok"
                id="ok"
                checked={formData.visibility === 'ok'}
                onChange={updateForm} 
              />
              <label htmlFor="ok">ok</label>
            </div>
            
            <div className="radio">
              <input
                type="radio"
                name="visibility"
                value="poor"
                id="poor"
                checked={formData.visibility === 'poor'}
                onChange={updateForm} 
              />
              <label htmlFor="poor">Poor</label>
            </div>
          </div>
          
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

