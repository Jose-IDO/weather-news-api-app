import { ApiResponse } from '../types';
export declare abstract class BaseComponent {
    protected name: string;
    protected isActive: boolean;
    constructor(name: string);
    getName(): string;
    isComponentActive(): boolean;
    activate(): void;
    deactivate(): void;
    protected log(message: string, level?: 'info' | 'error' | 'success'): void;
    protected handleError(error: unknown, context: string): ApiResponse<never>;
}
//# sourceMappingURL=BaseComponent.d.ts.map