"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncAwaitVersion = asyncAwaitVersion;
const AsyncManager_1 = require("./components/AsyncManager");
async function asyncAwaitVersion() {
    const asyncManager = new AsyncManager_1.AsyncManager();
    await asyncManager.runAsyncAwaitVersion();
}
//# sourceMappingURL=asyncAwaitVersion.js.map