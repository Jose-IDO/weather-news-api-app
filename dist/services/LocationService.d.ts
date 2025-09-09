import { BaseComponent } from '../components/BaseComponent';
import { Coordinates } from '../types';
export declare class LocationService extends BaseComponent {
    private rl;
    constructor();
    getCurrentLocation(): Promise<Coordinates>;
    askUserForLocation(): Promise<Coordinates>;
    getLocationWithFallback(): Promise<Coordinates>;
    getLocationByCity(cityName: string): Coordinates | null;
    close(): void;
}
//# sourceMappingURL=LocationService.d.ts.map