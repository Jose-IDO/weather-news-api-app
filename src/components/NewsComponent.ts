import * as https from 'https';
import fetch from 'node-fetch';
import { BaseComponent } from './BaseComponent';
import { NewsArticle, NewsApiResponse } from '../types';
import { CONFIG } from '../config';

export class NewsComponent extends BaseComponent {
  private countries: string;
  private limit: number;

  constructor(countries: string = CONFIG.NEWS_COUNTRIES, limit: number = CONFIG.NEWS_LIMIT) {
    super('NewsComponent');
    this.countries = countries;
    this.limit = limit;
  }

  public setCountries(countries: string): void {
    this.countries = countries;
    this.log(`Countries updated to: ${countries}`);
  }

  public setLimit(limit: number): void {
    this.limit = limit;
    this.log(`News limit updated to: ${limit}`);
  }

  public getCountries(): string {
    return this.countries;
  }

  public getLimit(): number {
    return this.limit;
  }

  public fetchNewsCallback(callback: (error: string | null, data?: NewsArticle[]) => void): void {
    this.log('Fetching news data using callbacks...');
    const newsUrl = this.buildNewsUrl();
    
    const request = https.get(newsUrl, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data) as NewsApiResponse;
          if (parsedData.error) {
            callback(`News API Error: ${parsedData.error.info}`);
          } else {
            const processedNews = this.processNewsData(parsedData);
            this.log('News data fetched successfully', 'success');
            callback(null, processedNews);
          }
        } catch (error) {
          callback(`Failed to parse news data: ${error}`);
        }
      });
    });
    
    request.on('error', (error) => {
      callback(`News request failed: ${error.message}`);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      callback('News request timeout');
    });
  }

  public async fetchNewsPromise(): Promise<NewsArticle[]> {
    this.log('Fetching news data using promises...');
    const newsUrl = this.buildNewsUrl();
    
    try {
      const response = await fetch(newsUrl);
      
      if (!response.ok) {
        throw new Error(`News API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json() as NewsApiResponse;
      
      if (data.error) {
        throw new Error(`News API Error: ${data.error.info}`);
      }
      
      const processedNews = this.processNewsData(data);
      this.log('News data fetched successfully', 'success');
      return processedNews;
    } catch (error) {
      throw new Error(`Failed to fetch news: ${error}`);
    }
  }

  public async fetchNewsAsync(): Promise<NewsArticle[]> {
    this.log('Fetching news data using async/await...');
    return this.fetchNewsPromise();
  }

  private buildNewsUrl(): string {
    return `${CONFIG.NEWS_BASE_URL}?access_key=${CONFIG.NEWS_API_KEY}&countries=${this.countries}&limit=${this.limit}&sort=published_desc`;
  }

  private processNewsData(apiResponse: NewsApiResponse): NewsArticle[] {
    return apiResponse.data.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source,
      image: article.image,
      publishedAt: article.published_at,
      author: article.author,
      category: article.category
    }));
  }
}
