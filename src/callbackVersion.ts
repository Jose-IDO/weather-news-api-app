import { AsyncManager } from './components/AsyncManager';

export async function callbackVersion(): Promise<void> {
  const asyncManager = new AsyncManager();
  await asyncManager.runCallbackVersion();
}

// Execute if this file is run directly
if (require.main === module) {
  callbackVersion().catch(console.error);
}