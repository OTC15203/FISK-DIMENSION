export const sessions = new Map();

const emitters = new Map();

export const hydrateSessions = (logger) => {
  setInterval(() => {
    const expiry = Date.now() - 1000 * 60 * 60;
    for (const [id, session] of sessions.entries()) {
      if (session.createdAt < expiry) {
        logger.info({ id }, 'Cleaning up expired session');
        sessions.delete(id);
        emitters.delete(id);
      }
    }
  }, 60000).unref();
};

export const registerEmitter = (id, emitter) => {
  emitters.set(id, emitter);
};

export const unregisterEmitter = (id) => {
  emitters.delete(id);
};

export const touchSession = (id, payload) => {
  const session = sessions.get(id);
  if (!session) return null;
  const enrichedEvent = {
    id: `${id}-${session.events.length + 1}`,
    payload,
    receivedAt: Date.now()
  };
  session.events.push(enrichedEvent);
  const emitter = emitters.get(id);
  if (emitter) {
    emitter(enrichedEvent);
  }
  return session;
};
