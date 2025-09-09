"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const callbackVersion_1 = require("./callbackVersion");
const promiseVersion_1 = require("./promiseVersion");
const asyncAwaitVersion_1 = require("./asyncAwaitVersion");
async function main() {
    console.log('ASYNC WEATHER & NEWS DASHBOARD');
    console.log('='.repeat(50));
    console.log('This app demonstrates three different async programming patterns:');
    console.log('1. Callbacks');
    console.log('2. Promises');
    console.log('3. Async/Await');
    console.log('='.repeat(50));
    const args = process.argv.slice(2);
    const version = args[0] || 'all';
    switch (version) {
        case 'callback':
            console.log('\nRunning Callback Version...');
            await (0, callbackVersion_1.callbackVersion)();
            break;
        case 'promise':
            console.log('\nRunning Promise Version...');
            (0, promiseVersion_1.promiseVersion)();
            break;
        case 'async':
            console.log('\nRunning Async/Await Version...');
            await (0, asyncAwaitVersion_1.asyncAwaitVersion)();
            break;
        case 'all':
        default:
            console.log('\nRunning Callback Version...');
            await (0, callbackVersion_1.callbackVersion)();
            setTimeout(async () => {
                console.log('\nRunning Promise Version...');
                await (0, promiseVersion_1.promiseVersion)();
            }, 2000);
            setTimeout(async () => {
                console.log('\nRunning Async/Await Version...');
                await (0, asyncAwaitVersion_1.asyncAwaitVersion)();
            }, 4000);
            break;
    }
}
main().catch(console.error);
//# sourceMappingURL=index.js.map