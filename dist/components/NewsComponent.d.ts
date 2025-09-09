import { BaseComponent } from './BaseComponent';
import { NewsArticle } from '../types';
export declare class NewsComponent extends BaseComponent {
    private countries;
    private limit;
    constructor(countries?: string, limit?: number);
    setCountries(countries: string): void;
    setLimit(limit: number): void;
    getCountries(): string;
    getLimit(): number;
    fetchNewsCallback(callback: (error: string | null, data?: NewsArticle[]) => void): void;
    fetchNewsPromise(): Promise<NewsArticle[]>;
    fetchNewsAsync(): Promise<NewsArticle[]>;
    private buildNewsUrl;
    private processNewsData;
}
//# sourceMappingURL=NewsComponent.d.ts.map