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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherComponent = void 0;
const https = __importStar(require("https"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const BaseComponent_1 = require("./BaseComponent");
const config_1 = require("../config");
const LocationService_1 = require("../services/LocationService");
class WeatherComponent extends BaseComponent_1.BaseComponent {
    constructor(coordinates = config_1.CONFIG.DEFAULT_COORDINATES) {
        super('WeatherComponent');
        this.coordinates = coordinates;
        this.locationService = new LocationService_1.LocationService();
    }
    setCoordinates(coordinates) {
        this.coordinates = coordinates;
        this.log(`Coordinates updated to: ${coordinates.lat}, ${coordinates.lon}`);
    }
    getCoordinates() {
        return this.coordinates;
    }
    async detectCurrentLocation() {
        try {
            this.log('Detecting current location...');
            const detectedCoordinates = await this.locationService.getLocationWithFallback();
            this.setCoordinates(detectedCoordinates);
            this.log('Location detection completed', 'success');
        }
        catch (error) {
            this.log(`Location detection failed: ${error}`, 'error');
            throw error;
        }
    }
    setLocationByCity(cityName) {
        const coordinates = this.locationService.getLocationByCity(cityName);
        if (coordinates) {
            this.setCoordinates(coordinates);
            return true;
        }
        return false;
    }
    fetchWeatherCallback(callback) {
        this.log('Fetching weather data using callbacks...');
        const weatherUrl = this.buildWeatherUrl();
        const request = https.get(weatherUrl, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    if (parsedData.cod && parsedData.cod !== 200) {
                        callback(`Weather API Error: ${parsedData.message}`);
                    }
                    else {
                        const processedWeather = this.processWeatherData(parsedData);
                        this.log('Weather data fetched successfully', 'success');
                        callback(null, processedWeather);
                    }
                }
                catch (error) {
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
    async fetchWeatherPromise() {
        this.log('Fetching weather data using promises...');
        const weatherUrl = this.buildWeatherUrl();
        try {
            const response = await (0, node_fetch_1.default)(weatherUrl);
            if (!response.ok) {
                throw new Error(`Weather API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.cod && data.cod !== 200) {
                throw new Error(`Weather API Error: ${data.message}`);
            }
            const processedWeather = this.processWeatherData(data);
            this.log('Weather data fetched successfully', 'success');
            return processedWeather;
        }
        catch (error) {
            throw new Error(`Failed to fetch weather: ${error}`);
        }
    }
    async fetchWeatherAsync() {
        this.log('Fetching weather data using async/await...');
        return this.fetchWeatherPromise();
    }
    buildWeatherUrl() {
        return `${config_1.CONFIG.WEATHER_BASE_URL}/weather?lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&appid=${config_1.CONFIG.WEATHER_API_KEY}&units=metric`;
    }
    processWeatherData(apiResponse) {
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
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=WeatherComponent.js.map