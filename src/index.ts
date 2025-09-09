import { callbackVersion } from './callbackVersion';
import { promiseVersion } from './promiseVersion';
import { asyncAwaitVersion } from './asyncAwaitVersion';

async function main() {
  console.log('ASYNC WEATHER & NEWS DASHBOARD');
  console.log('=' .repeat(50));
  console.log('This app demonstrates three different async programming patterns:');
  console.log('1. Callbacks');
  console.log('2. Promises');
  console.log('3. Async/Await');
  console.log('=' .repeat(50));
  
  const args = process.argv.slice(2);
  const version = args[0] || 'all';
  
  switch (version) {
    case 'callback':
      console.log('\nRunning Callback Version...');
      await callbackVersion();
      break;
    case 'promise':
      console.log('\nRunning Promise Version...');
      promiseVersion();
      break;
    case 'async':
      console.log('\nRunning Async/Await Version...');
      await asyncAwaitVersion();
      break;
    case 'all':
    default:
      console.log('\nRunning Callback Version...');
      await callbackVersion();
      
      setTimeout(async () => {
        console.log('\nRunning Promise Version...');
        await promiseVersion();
      }, 2000);
      
      setTimeout(async () => {
        console.log('\nRunning Async/Await Version...');
        await asyncAwaitVersion();
      }, 4000);
      break;
  }
}

main().catch(console.error);
