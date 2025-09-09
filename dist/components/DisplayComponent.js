"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayComponent = void 0;
const BaseComponent_1 = require("./BaseComponent");
class DisplayComponent extends BaseComponent_1.BaseComponent {
    constructor() {
        super('DisplayComponent');
    }
    displayWeather(weather) {
        this.log('Displaying weather information...');
        console.log('\nWEATHER INFORMATION');
        console.log('='.repeat(50));
        console.log(`Location: ${weather.location}, ${weather.country}`);
        console.log(`Temperature: ${weather.temperature}°C (feels like ${weather.feelsLike}°C)`);
        console.log(`Condition: ${weather.condition} - ${weather.description}`);
        console.log(`Humidity: ${weather.humidity}%`);
        console.log(`Wind Speed: ${weather.windSpeed} m/s`);
        console.log(`Icon: ${weather.icon}`);
    }
    displayNews(news) {
        this.log('Displaying news headlines...');
        console.log('\nNEWS HEADLINES');
        console.log('='.repeat(50));
        news.forEach((article, index) => {
            console.log(`\n${index + 1}. ${article.title}`);
            console.log(`   ${article.description}`);
            console.log(`   Source: ${article.source}`);
            console.log(`   Published: ${new Date(article.publishedAt).toLocaleDateString()}`);
            if (article.author) {
                console.log(`   Author: ${article.author}`);
            }
            console.log(`   URL: ${article.url}`);
            if (article.category) {
                console.log(`   Category: ${article.category}`);
            }
        });
    }
    displayError(error, context) {
        this.log(`Error in ${context}: ${error}`, 'error');
        console.log('\nERROR');
        console.log('='.repeat(50));
        console.log(`Context: ${context}`);
        console.log(`Error: ${error}`);
    }
    displayHeader(version) {
        this.log(`Starting ${version} implementation...`);
        console.log('\nASYNC WEATHER & NEWS DASHBOARD');
        console.log('='.repeat(50));
        console.log(`Implementation: ${version}`);
        console.log('='.repeat(50));
    }
    displaySuccess(message) {
        this.log(message, 'success');
        console.log(`\n${message}`);
    }
    displaySeparator() {
        console.log('\n' + '='.repeat(50));
    }
}
exports.DisplayComponent = DisplayComponent;
//# sourceMappingURL=DisplayComponent.js.map