import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import router from '../routes/index.js';
import { createLogger } from '../utils/logger.js';
import { hydrateSessions } from '../services/sessionService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '../../deploy/env/.env') });

const app = express();
const logger = createLogger();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(compression());

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.originalUrl }, 'Incoming request');
  next();
});

app.use('/api', router);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use((err, req, res, next) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ message: 'Internal server error' });
});

hydrateSessions(logger);

app.listen(port, () => {
  logger.info(`Fisk Dimension backend listening on port ${port}`);
});
