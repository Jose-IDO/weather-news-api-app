"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseVersion = promiseVersion;
const AsyncManager_1 = require("./components/AsyncManager");
function promiseVersion() {
    const asyncManager = new AsyncManager_1.AsyncManager();
    asyncManager.runPromiseVersion().catch(console.error);
}
//# sourceMappingURL=promiseVersion.js.map