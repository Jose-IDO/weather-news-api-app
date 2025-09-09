"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbackVersion = callbackVersion;
const AsyncManager_1 = require("./components/AsyncManager");
async function callbackVersion() {
    const asyncManager = new AsyncManager_1.AsyncManager();
    await asyncManager.runCallbackVersion();
}
//# sourceMappingURL=callbackVersion.js.map