import { Entry } from "../../types";
import HealthCheckEntrySection from "./HealthCheckEntrySection";
import HospitalEntrySection from "./HospitalEntrySection";
import OccupationalHealthEntrySection from "./OccupationalHealthEntrySection";
import { assertNever } from "../../utils";

interface Props {
  entry: Entry;
}

const SingleEntry = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntrySection entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthEntrySection entry={entry} />
    case "HealthCheck":
      return <HealthCheckEntrySection entry={entry} />
    default:
      return assertNever(entry)
  }
}

export default SingleEntry;