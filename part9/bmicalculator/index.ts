import express from 'express';
//import axios from 'axios';
import { calculateBmi } from './bmiCalculator';


const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!(req.query.height) || !(req.query.weight)) {
    res.send({error: "malformatted parameters"})
  }
  console.log(typeof req.query.weight)
  const height: number = Number(req.query.height as string);
  const weight: number = Number(req.query.weight as string);
  res.send(calculateBmi(height, weight));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})