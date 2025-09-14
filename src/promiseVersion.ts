import { AsyncManager } from './components/AsyncManager';

export function promiseVersion(): void {
  const asyncManager = new AsyncManager();
  asyncManager.runPromiseVersion().catch(console.error);
}

// Execute if this file is run directly
if (require.main === module) {
  promiseVersion();
}