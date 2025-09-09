import { BaseComponent } from './BaseComponent';
import { WeatherData, NewsArticle } from '../types';
export declare class DisplayComponent extends BaseComponent {
    constructor();
    displayWeather(weather: WeatherData): void;
    displayNews(news: NewsArticle[]): void;
    displayError(error: string, context: string): void;
    displayHeader(version: string): void;
    displaySuccess(message: string): void;
    displaySeparator(): void;
}
//# sourceMappingURL=DisplayComponent.d.ts.map