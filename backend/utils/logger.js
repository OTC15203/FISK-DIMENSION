import pino from 'pino';

export const createLogger = () =>
  pino({
    name: 'fisk-dimension-backend',
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined
  });
