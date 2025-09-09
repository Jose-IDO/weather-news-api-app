import { AsyncManager } from './components/AsyncManager';

export async function callbackVersion(): Promise<void> {
  const asyncManager = new AsyncManager();
  await asyncManager.runCallbackVersion();
}
