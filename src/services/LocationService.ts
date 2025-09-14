import { BaseComponent } from '../components/BaseComponent';
import { Coordinates } from '../types';
import * as readline from 'readline';

export class LocationService extends BaseComponent {
  private rl: readline.Interface;

  constructor() {
    super('LocationService');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public async getCurrentLocation(): Promise<Coordinates> {
    try {
      this.log('Detecting your current location...');
      
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json() as {
        status: string;
        lat: number;
        lon: number;
        city: string;
        country: string;
        message?: string;
      };
      
      if (data.status === 'success') {
        const coordinates: Coordinates = {
          lat: data.lat,
          lon: data.lon
        };
        this.log(`Location detected: ${data.city}, ${data.country}`, 'success');
        return coordinates;
      } else {
        throw new Error(data.message || 'Failed to get location');
      }
    } catch (error) {
      this.log(`Automatic location detection failed: ${error}`, 'error');
      throw error;
    }
  }

  public async askUserForLocation(): Promise<Coordinates> {
    return new Promise((resolve) => {
      console.log('\nWe couldn\'t automatically detect your location.');
      console.log('Please enter your city name (e.g., "London", "New York", "Tokyo"):');
      
      this.rl.question('City: ', async (cityName) => {
        const coordinates = this.getLocationByCity(cityName);
        if (coordinates) {
          resolve(coordinates);
        } else {
          console.log('City not found. Please try again with a different city name.');
          const retryCoordinates = await this.askUserForLocation();
          resolve(retryCoordinates);
        }
      });
    });
  }

  public async getLocationWithFallback(): Promise<Coordinates> {
    try {
      return await this.getCurrentLocation();
    } catch (error) {
      this.log('Asking user for their location...', 'info');
      return await this.askUserForLocation();
    }
  }

  public getLocationByCity(cityName: string): Coordinates | null {
    const cityCoordinates: { [key: string]: Coordinates } = {
      'pretoria': { lat: -25.7479, lon: 28.2293 },
      'johannesburg': { lat: -26.2041, lon: 28.0473 },
      'cape town': { lat: -33.9249, lon: 18.4241 },
      'durban': { lat: -29.8587, lon: 31.0218 },
      'london': { lat: 51.5074, lon: -0.1278 },
      'new york': { lat: 40.7128, lon: -74.0060 },
      'tokyo': { lat: 35.6762, lon: 139.6503 },
      'sydney': { lat: -33.8688, lon: 151.2093 },
      'paris': { lat: 48.8566, lon: 2.3522 },
      'berlin': { lat: 52.5200, lon: 13.4050 },
      'madrid': { lat: 40.4168, lon: -3.7038 },
      'rome': { lat: 41.9028, lon: 12.4964 },
      'moscow': { lat: 55.7558, lon: 37.6176 },
      'beijing': { lat: 39.9042, lon: 116.4074 },
      'mumbai': { lat: 19.0760, lon: 72.8777 },
      'delhi': { lat: 28.7041, lon: 77.1025 },
      'cairo': { lat: 30.0444, lon: 31.2357 },
      'lagos': { lat: 6.5244, lon: 3.3792 },
      'nairobi': { lat: -1.2921, lon: 36.8219 }
    };

    const city = cityName.toLowerCase().trim();
    const coordinates = cityCoordinates[city];
    
    if (coordinates) {
      this.log(`Location found for ${cityName}: ${coordinates.lat}, ${coordinates.lon}`, 'success');
      return coordinates;
    }
    
    this.log(`City not found: ${cityName}`, 'error');
    return null;
  }

  public close(): void {
    this.rl.close();
  }
}
