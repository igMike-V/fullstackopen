import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getAll());
});

router.get('/:id', (req, res) => {
  const diagnosis = diagnoseService.findByCode(String(req.params.id));
  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
})

export default router;