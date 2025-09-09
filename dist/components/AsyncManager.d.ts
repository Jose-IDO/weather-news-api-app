import { BaseComponent } from './BaseComponent';
import { WeatherComponent } from './WeatherComponent';
import { NewsComponent } from './NewsComponent';
import { DisplayComponent } from './DisplayComponent';
export declare class AsyncManager extends BaseComponent {
    private weatherComponent;
    private newsComponent;
    private displayComponent;
    constructor();
    getWeatherComponent(): WeatherComponent;
    getNewsComponent(): NewsComponent;
    getDisplayComponent(): DisplayComponent;
    runCallbackVersion(): Promise<void>;
    runPromiseVersion(): Promise<void>;
    runAsyncAwaitVersion(): Promise<void>;
}
//# sourceMappingURL=AsyncManager.d.ts.map