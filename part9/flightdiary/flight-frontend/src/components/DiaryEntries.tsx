import { NonSensitiveDiaryEntry } from "../interfaces";
import Entry from "./Entry";

interface DiaryEntryProps {
  diaryEntries: NonSensitiveDiaryEntry[];
}

const DiaryEntries = (props:DiaryEntryProps) => {
  console.log(props);
  return (
    <section className="diary-entries">
       { props.diaryEntries.map(entry => <Entry key={entry.id} diaryEntry={entry} />) }; 
    </section>
  );
}

export default DiaryEntries;