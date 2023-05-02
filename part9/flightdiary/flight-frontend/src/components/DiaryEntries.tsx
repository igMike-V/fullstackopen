import { NonSensitiveDiaryEntry } from "../interfaces";
import Entry from "./Entry";

interface DiaryEntryProps {
  diaryEntries: NonSensitiveDiaryEntry[];
}

const DiaryEntries = (props:DiaryEntryProps) => {
  if (!props.diaryEntries) {
    return (
      <section className="diary-entries">
        Loading entries...
      </section>
    )
  }
  return (
    <section className="diary-entries">
       { props.diaryEntries.map(entry => <Entry key={entry.id} diaryEntry={entry} />) }; 
    </section>
  );
}

export default DiaryEntries;