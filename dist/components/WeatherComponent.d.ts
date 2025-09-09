import { BaseComponent } from './BaseComponent';
import { WeatherData, Coordinates } from '../types';
export declare class WeatherComponent extends BaseComponent {
    private coordinates;
    private locationService;
    constructor(coordinates?: Coordinates);
    setCoordinates(coordinates: Coordinates): void;
    getCoordinates(): Coordinates;
    detectCurrentLocation(): Promise<void>;
    setLocationByCity(cityName: string): boolean;
    fetchWeatherCallback(callback: (error: string | null, data?: WeatherData) => void): void;
    fetchWeatherPromise(): Promise<WeatherData>;
    fetchWeatherAsync(): Promise<WeatherData>;
    private buildWeatherUrl;
    private processWeatherData;
}
//# sourceMappingURL=WeatherComponent.d.ts.map