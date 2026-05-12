if (typeof window !== 'undefined') {
  console.log('BOOT_01_MODULE_START', { timestamp: new Date().toISOString() });

  if (typeof window !== 'undefined') {
    console.log('BOOT_02_ENV_READY', {
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  }

  window.__AA_RUNTIME_READY__ = true;
}

export const logBootStage = (stage: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    console.log(`BOOT_${stage}`, { timestamp: new Date().toISOString(), ...data });
  }
};