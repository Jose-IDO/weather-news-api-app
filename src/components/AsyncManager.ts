import { BaseComponent } from './BaseComponent';
import { WeatherComponent } from './WeatherComponent';
import { NewsComponent } from './NewsComponent';
import { DisplayComponent } from './DisplayComponent';
import { WeatherData, NewsArticle } from '../types';

export class AsyncManager extends BaseComponent {
  private weatherComponent: WeatherComponent;
  private newsComponent: NewsComponent;
  private displayComponent: DisplayComponent;

  constructor() {
    super('AsyncManager');
    this.weatherComponent = new WeatherComponent();
    this.newsComponent = new NewsComponent();
    this.displayComponent = new DisplayComponent();
  }

  public getWeatherComponent(): WeatherComponent {
    return this.weatherComponent;
  }

  public getNewsComponent(): NewsComponent {
    return this.newsComponent;
  }

  public getDisplayComponent(): DisplayComponent {
    return this.displayComponent;
  }

  public async runCallbackVersion(): Promise<void> {
    this.displayComponent.displayHeader('Callbacks');
    
    try {
      await this.weatherComponent.detectCurrentLocation();
    } catch (error) {
      this.displayComponent.displayError('Failed to detect location. Please try again.', 'Location Detection');
      return;
    }
    
    this.weatherComponent.fetchWeatherCallback((weatherError, weatherData) => {
      if (weatherError) {
        this.displayComponent.displayError(weatherError, 'Weather API');
        return;
      }
      
      if (weatherData) {
        this.displayComponent.displayWeather(weatherData);
      }
      
      this.newsComponent.fetchNewsCallback((newsError, newsData) => {
        if (newsError) {
          this.displayComponent.displayError(newsError, 'News API');
          return;
        }
        
        if (newsData) {
          this.displayComponent.displayNews(newsData);
        }
        
        this.displayComponent.displaySuccess('Callback version completed!');
      });
    });
  }

  public async runPromiseVersion(): Promise<void> {
    this.displayComponent.displayHeader('Promises');
    
    try {
      await this.weatherComponent.detectCurrentLocation();
    } catch (error) {
      this.displayComponent.displayError('Failed to detect location. Please try again.', 'Location Detection');
      return;
    }
    
    try {
      this.log('Running sequential promise execution...');
      const weatherData = await this.weatherComponent.fetchWeatherPromise();
      this.displayComponent.displayWeather(weatherData);
      
      const newsData = await this.newsComponent.fetchNewsPromise();
      this.displayComponent.displayNews(newsData);
      
      this.displayComponent.displaySuccess('Sequential promise execution completed!');
      
      setTimeout(async () => {
        this.log('Running parallel promise execution...');
        const [weatherDataParallel, newsDataParallel] = await Promise.all([
          this.weatherComponent.fetchWeatherPromise(),
          this.newsComponent.fetchNewsPromise()
        ]);
        
        this.displayComponent.displayWeather(weatherDataParallel);
        this.displayComponent.displayNews(newsDataParallel);
        
        this.displayComponent.displaySuccess('Parallel promise execution completed!');
      }, 2000);
      
      setTimeout(async () => {
        this.log('Running Promise.race() example...');
        const fastestData = await Promise.race([
          this.weatherComponent.fetchWeatherPromise(),
          this.newsComponent.fetchNewsPromise()
        ]);
        
        if ('location' in fastestData) {
          this.displayComponent.displayWeather(fastestData as WeatherData);
          this.log('Weather API was faster!', 'success');
        } else {
          this.displayComponent.displayNews(fastestData as NewsArticle[]);
          this.log('News API was faster!', 'success');
        }
        
        this.displayComponent.displaySuccess('Promise.race() completed');
      }, 4000);
      
    } catch (error) {
      this.displayComponent.displayError(error as string, 'Promise Chain');
    }
  }

  public async runAsyncAwaitVersion(): Promise<void> {
    this.displayComponent.displayHeader('Async/Await');
    
    try {
      await this.weatherComponent.detectCurrentLocation();
    } catch (error) {
      this.displayComponent.displayError('Failed to detect location. Please try again.', 'Location Detection');
      return;
    }
    
    try {
      this.log('Running sequential async/await execution...');
      const weatherData = await this.weatherComponent.fetchWeatherAsync();
      this.displayComponent.displayWeather(weatherData);
      
      const newsData = await this.newsComponent.fetchNewsAsync();
      this.displayComponent.displayNews(newsData);
      
      this.displayComponent.displaySuccess('Sequential async/await completed!');
      
      setTimeout(async () => {
        this.log('Running parallel async/await execution...');
        const [weatherDataParallel, newsDataParallel] = await Promise.all([
          this.weatherComponent.fetchWeatherAsync(),
          this.newsComponent.fetchNewsAsync()
        ]);
        
        this.displayComponent.displayWeather(weatherDataParallel);
        this.displayComponent.displayNews(newsDataParallel);
        
        this.displayComponent.displaySuccess('Parallel async/await completed');
      }, 2000);
      
    } catch (error) {
      this.displayComponent.displayError(error as string, 'Async/Await');
    }
  }
}
