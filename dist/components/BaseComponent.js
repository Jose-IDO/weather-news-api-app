"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
class BaseComponent {
    constructor(name) {
        this.isActive = false;
        this.name = name;
    }
    getName() {
        return this.name;
    }
    isComponentActive() {
        return this.isActive;
    }
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
    log(message, level = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = level.toUpperCase();
        console.log(`[${prefix}] [${timestamp}] [${this.name}] ${message}`);
    }
    handleError(error, context) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.log(`Error in ${context}: ${errorMessage}`, 'error');
        return {
            success: false,
            error: errorMessage
        };
    }
}
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=BaseComponent.js.map