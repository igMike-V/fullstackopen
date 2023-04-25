import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, IsTrainingInput } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!(req.query.height) || !(req.query.weight)) {
    res.send({ error: "malformatted parameters" });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.json(calculateBmi(height, weight));
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: IsTrainingInput = req.body;
  if (body.daily_exercises.length < 1 || !body.target) {
    res.send({ error: "parameters missing" });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.send(calculateExercises(body));
  }
  
  

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});