import diagnosesService from "../../services/diagnoses";
import { useState, useEffect } from 'react'
import { Diagnosis } from "../../types";

interface Props {
  code: string;
}

const DiagnosisDetail = ({ code }: Props) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();

  useEffect(() => {
    const getDiagnosis = async () => {
      const request = await diagnosesService.getByCode(code);
      setDiagnosis(request);
    }
    getDiagnosis()

  }, [code])
  
  if (!diagnosis) {
    return null;
  }
  return (
    <li className="diagnose-code">
      {diagnosis.code && `${diagnosis.code} ${diagnosis.name}`}
    </li>
  );
}

export default DiagnosisDetail;


