import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { sessions, touchSession } from '../services/sessionService.js';
import { createEventStream } from '../utils/sse.js';

const router = Router();

router.get('/v1/session', (req, res) => {
  const sessionId = uuid();
  sessions.set(sessionId, { id: sessionId, createdAt: Date.now(), events: [] });
  res.json({ sessionId });
});

router.post('/v1/session/:id/events', (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const session = touchSession(id, payload);
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }
  return res.status(201).json({ ok: true });
});

router.get('/v1/session/:id/stream', (req, res) => {
  const { id } = req.params;
  if (!sessions.has(id)) {
    res.status(404).json({ message: 'Session not found' });
    return;
  }
  createEventStream(id, res);
});

router.get('/v1/echo', (req, res) => {
  res.json({ message: 'Fisk Dimension backend online', timestamp: new Date().toISOString() });
});

export default router;
