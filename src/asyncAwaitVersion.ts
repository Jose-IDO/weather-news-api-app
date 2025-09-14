import { AsyncManager } from './components/AsyncManager';

export async function asyncAwaitVersion(): Promise<void> {
  const asyncManager = new AsyncManager();
  await asyncManager.runAsyncAwaitVersion();
}

// Execute if this file is run directly
if (require.main === module) {
  asyncAwaitVersion().catch(console.error);
}