import express from 'express';
import { calculateBmi } from './bmiCalculator';


const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!(req.query.height) || !(req.query.weight)) {
    res.send({ error: "malformatted parameters" });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.send(calculateBmi(height, weight));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});