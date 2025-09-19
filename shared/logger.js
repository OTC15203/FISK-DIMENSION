export const createAuditLogger = ({ stream = console, prefix = '[AUDIT]' } = {}) => ({
  track(event, metadata = {}) {
    const payload = {
      event,
      metadata,
      at: new Date().toISOString()
    };
    stream.log(`${prefix} ${JSON.stringify(payload)}`);
    return payload;
  }
});
