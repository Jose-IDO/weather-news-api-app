import { AsyncManager } from './components/AsyncManager';

export async function asyncAwaitVersion(): Promise<void> {
  const asyncManager = new AsyncManager();
  await asyncManager.runAsyncAwaitVersion();
}
