import express from 'express';
import cors from 'cors';
import { clients, dashboard, leads, predict } from './data.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API FordRetain ativa.' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'FordRetain API' });
});

app.get('/dashboard', (_req, res) => {
  res.json(dashboard);
});

app.get('/leads', (_req, res) => {
  res.json(leads);
});

app.get('/client/:id', (req, res) => {
  const client = clients.find((item) => item.id === req.params.id);
  if (!client) return res.status(404).json({ error: 'Cliente não encontrado.' });
  res.json(client);
});

app.post('/predict', (req, res) => {
  res.json(predict(req.body));
});

app.listen(PORT, () => {
  console.log(`FordRetain API rodando em http://localhost:${PORT}`);
});
