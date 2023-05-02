import { NonSensitiveDiaryEntry } from "../interfaces";

interface EntryProps {
  diaryEntry: NonSensitiveDiaryEntry
}

const Entry = (props: EntryProps) => {
  const { date, visibility, weather } = props.diaryEntry;
  return (
    <div className="diary-entry">
      <h3>{date}</h3>
      <p className="entry-detail">visibility: {visibility}</p>
      <p className="entry-detail">weather: {weather}</p>
    </div>
  );
}

export default Entry;