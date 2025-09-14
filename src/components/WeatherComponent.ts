import * as https from 'https';
import fetch from 'node-fetch';
import { BaseComponent } from './BaseComponent';
import { WeatherData, WeatherApiResponse, Coordinates } from '../types';
import { CONFIG } from '../config';
import { LocationService } from '../services/LocationService';

export class WeatherComponent extends BaseComponent {
  private coordinates: Coordinates;
  private locationService: LocationService;

  constructor(coordinates: Coordinates = CONFIG.DEFAULT_COORDINATES) {
    super('WeatherComponent');
    this.coordinates = coordinates;
    this.locationService = new LocationService();
  }

  public setCoordinates(coordinates: Coordinates): void {
    this.coordinates = coordinates;
    this.log(`Coordinates updated to: ${coordinates.lat}, ${coordinates.lon}`);
  }

  public getCoordinates(): Coordinates {
    return this.coordinates;
  }

  public async detectCurrentLocation(): Promise<void> {
    try {
      this.log('Detecting current location...');
      const detectedCoordinates = await this.locationService.getLocationWithFallback();
      this.setCoordinates(detectedCoordinates);
      this.log('Location detection completed', 'success');
    } catch (error) {
      this.log(`Location detection failed: ${error}`, 'error');
      throw error;
    }
  }

  public setLocationByCity(cityName: string): boolean {
    const coordinates = this.locationService.getLocationByCity(cityName);
    if (coordinates) {
      this.setCoordinates(coordinates);
      return true;
    }
    return false;
  }

  public fetchWeatherCallback(callback: (error: string | null, data?: WeatherData) => void): void {
    this.log('Fetching weather data using callbacks...');
    const weatherUrl = this.buildWeatherUrl();
    
    const request = https.get(weatherUrl, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data) as WeatherApiResponse;
          if (parsedData.cod && parsedData.cod !== 200) {
            callback(`Weather API Error: ${parsedData.message}`);
          } else {
            const processedWeather = this.processWeatherData(parsedData);
            this.log('Weather data fetched successfully', 'success');
            callback(null, processedWeather);
          }
        } catch (error) {
          callback(`Failed to parse weather data: ${error}`);
        }
      });
    });
    
    request.on('error', (error) => {
      callback(`Weather request failed: ${error.message}`);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      callback('Weather request timeout');
    });
  }

  public async fetchWeatherPromise(): Promise<WeatherData> {
    this.log('Fetching weather data using promises...');
    const weatherUrl = this.buildWeatherUrl();
    
    try {
      const response = await fetch(weatherUrl);
      
      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json() as WeatherApiResponse;
      
      if (data.cod && data.cod !== 200) {
        throw new Error(`Weather API Error: ${data.message}`);
      }
      
      const processedWeather = this.processWeatherData(data);
      this.log('Weather data fetched successfully', 'success');
      return processedWeather;
    } catch (error) {
      throw new Error(`Failed to fetch weather: ${error}`);
    }
  }

  public async fetchWeatherAsync(): Promise<WeatherData> {
    this.log('Fetching weather data using async/await...');
    return this.fetchWeatherPromise();
  }

  private buildWeatherUrl(): string {
    return `${CONFIG.WEATHER_BASE_URL}/weather?lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric`;
  }

  private processWeatherData(apiResponse: WeatherApiResponse): WeatherData {
    return {
      location: apiResponse.name,
      country: apiResponse.sys.country,
      temperature: Math.round(apiResponse.main.temp),
      condition: apiResponse.weather[0].main,
      humidity: apiResponse.main.humidity,
      windSpeed: apiResponse.wind.speed,
      feelsLike: Math.round(apiResponse.main.feels_like),
      description: apiResponse.weather[0].description,
      icon: apiResponse.weather[0].icon
    };
  }
}
