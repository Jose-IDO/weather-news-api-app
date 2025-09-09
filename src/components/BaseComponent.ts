import { ApiResponse } from '../types';

export abstract class BaseComponent {
  protected name: string;
  protected isActive: boolean = false;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public isComponentActive(): boolean {
    return this.isActive;
  }

  public activate(): void {
    this.isActive = true;
  }

  public deactivate(): void {
    this.isActive = false;
  }

  protected log(message: string, level: 'info' | 'error' | 'success' = 'info'): void {
    const timestamp = new Date().toISOString();
    const prefix = level.toUpperCase();
    console.log(`[${prefix}] [${timestamp}] [${this.name}] ${message}`);
  }

  protected handleError(error: unknown, context: string): ApiResponse<never> {
    const errorMessage = error instanceof Error ? error.message : String(error);
    this.log(`Error in ${context}: ${errorMessage}`, 'error');
    return {
      success: false,
      error: errorMessage
    };
  }
}
