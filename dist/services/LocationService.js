"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const BaseComponent_1 = require("../components/BaseComponent");
const readline = __importStar(require("readline"));
class LocationService extends BaseComponent_1.BaseComponent {
    constructor() {
        super('LocationService');
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    async getCurrentLocation() {
        try {
            this.log('Detecting your current location...');
            const response = await fetch('http://ip-api.com/json/');
            const data = await response.json();
            if (data.status === 'success') {
                const coordinates = {
                    lat: data.lat,
                    lon: data.lon
                };
                this.log(`Location detected: ${data.city}, ${data.country}`, 'success');
                return coordinates;
            }
            else {
                throw new Error(data.message || 'Failed to get location');
            }
        }
        catch (error) {
            this.log(`Automatic location detection failed: ${error}`, 'error');
            throw error;
        }
    }
    async askUserForLocation() {
        return new Promise((resolve) => {
            console.log('\nWe couldn\'t automatically detect your location.');
            console.log('Please enter your city name (e.g., "London", "New York", "Tokyo"):');
            this.rl.question('City: ', async (cityName) => {
                const coordinates = this.getLocationByCity(cityName);
                if (coordinates) {
                    resolve(coordinates);
                }
                else {
                    console.log('City not found. Please try again with a different city name.');
                    const retryCoordinates = await this.askUserForLocation();
                    resolve(retryCoordinates);
                }
            });
        });
    }
    async getLocationWithFallback() {
        try {
            return await this.getCurrentLocation();
        }
        catch (error) {
            this.log('Asking user for their location...', 'info');
            return await this.askUserForLocation();
        }
    }
    getLocationByCity(cityName) {
        const cityCoordinates = {
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
    close() {
        this.rl.close();
    }
}
exports.LocationService = LocationService;
//# sourceMappingURL=LocationService.js.map