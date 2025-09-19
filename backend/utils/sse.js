import { registerEmitter, unregisterEmitter } from '../services/sessionService.js';

export const createEventStream = (sessionId, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write(`event: ready\ndata: {"sessionId":"${sessionId}"}\n\n`);

  const emitter = (event) => {
    res.write(`event: payload\ndata: ${JSON.stringify(event)}\n\n`);
  };

  registerEmitter(sessionId, emitter);

  attachCloseHandlers(res, () => {
    unregisterEmitter(sessionId);
  });
};

const attachCloseHandlers = (res, handler) => {
  const cleanup = () => {
    handler();
    res.end();
  };
  res.on('close', cleanup);
  res.on('finish', cleanup);
};
