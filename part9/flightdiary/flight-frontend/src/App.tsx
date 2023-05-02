import DiaryForm from './components/DiaryForm';
import DiaryEntries from './components/DiaryEntries';
import { getAllEntries } from './services/diaryService';
import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry } from './interfaces';

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((data: NonSensitiveDiaryEntry[]) => {
      setEntries(data)
    })
  }, [])

  return (
    <div className="App">
      <DiaryForm entries={entries} setEntries={setEntries} />
      <DiaryEntries diaryEntries={entries} />
    </div>
  );
}

export default App;
