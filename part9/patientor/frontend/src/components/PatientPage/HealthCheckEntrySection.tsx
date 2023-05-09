
import { HealthCheckEntry } from "../../types";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Diagnosis from "./Diagnosis";

interface Props {
  entry: HealthCheckEntry;
}

interface HealthRatingProps {
  rating: number;
}

const HealthRating = ({ rating }: HealthRatingProps) => {
  
  const hearts = Array(4).fill(0);
  let thekey: number = 4;
  return (
    <div className="rating-icons">
      {hearts.map(k => {
        
        thekey = thekey - 1;
        if (thekey < rating) {
          return (
            <FavoriteBorderIcon key={thekey} style={{ color: 'red' }} />
          );
        } else {
          return (
            <FavoriteIcon key={thekey} style={{ color: 'red' }} />
          );
        }
        
      })}
    </div>
  )
}

const HealthCheckEntrySection = ({ entry }: Props) => {
  return (
    <div className="single-entry single-entry-healthcheck">
      <div className="single-entry--icon single-entry--icon-healthcheck">
        <MonitorHeartIcon  style={{ color: 'white' }}  /> 
        <div className="single-entry--icon-date">
          {entry.date}
        </div>
      </div>
      <div className="single-entry--content">
        <div className="single-entry--description">
          {entry.description}
        </div>
        <div className="single-entry--diagnosis">
          {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 ? <Diagnosis entry={entry}/> : 'No current Diagnosis'}
        </div>
        <div className="single-entry--rating">
          {<HealthRating rating={entry.healthCheckRating} />}
        </div>
        <div className="single-entry--specialist">
          Diagnosis by {entry.specialist}
        </div>
      </div>
       
    </div>
  )
}

export default HealthCheckEntrySection;