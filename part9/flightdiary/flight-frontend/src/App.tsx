import DiaryForm from './components/DiaryForm';
import axios from 'axios';
import DiaryEntries from './components/DiaryEntries';
import { getAllEntries } from './services/diaryService';
import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry } from './interfaces';
import Notifications from './components/Notifications';
import './app.css';

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState<string>('');

   const setMessage = (value: string) => {
    setNotification(value);
    setTimeout(() => {
      setNotification('')
    }, 4000)
  }

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getAllEntries();
      if (data) {
        setEntries(data);
      }
    }
    try {
      fetchEntries();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMessage(error.response.data)
        } else {
          setMessage('error. could not retrieve entries')
        }
      }
    }
    
  }, [])

  return (
    <div className="App">
      <Notifications notification={notification} />
      <DiaryForm entries={entries} setEntries={setEntries} setMessage={setMessage} />
      <DiaryEntries diaryEntries={entries} />
    </div>
  );
}

export default App;
