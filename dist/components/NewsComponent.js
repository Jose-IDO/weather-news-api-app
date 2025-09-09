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
exports.NewsComponent = void 0;
const https = __importStar(require("https"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const BaseComponent_1 = require("./BaseComponent");
const config_1 = require("../config");
class NewsComponent extends BaseComponent_1.BaseComponent {
    constructor(countries = config_1.CONFIG.NEWS_COUNTRIES, limit = config_1.CONFIG.NEWS_LIMIT) {
        super('NewsComponent');
        this.countries = countries;
        this.limit = limit;
    }
    setCountries(countries) {
        this.countries = countries;
        this.log(`Countries updated to: ${countries}`);
    }
    setLimit(limit) {
        this.limit = limit;
        this.log(`News limit updated to: ${limit}`);
    }
    getCountries() {
        return this.countries;
    }
    getLimit() {
        return this.limit;
    }
    fetchNewsCallback(callback) {
        this.log('Fetching news data using callbacks...');
        const newsUrl = this.buildNewsUrl();
        const request = https.get(newsUrl, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    if (parsedData.error) {
                        callback(`News API Error: ${parsedData.error.info}`);
                    }
                    else {
                        const processedNews = this.processNewsData(parsedData);
                        this.log('News data fetched successfully', 'success');
                        callback(null, processedNews);
                    }
                }
                catch (error) {
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
    async fetchNewsPromise() {
        this.log('Fetching news data using promises...');
        const newsUrl = this.buildNewsUrl();
        try {
            const response = await (0, node_fetch_1.default)(newsUrl);
            if (!response.ok) {
                throw new Error(`News API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(`News API Error: ${data.error.info}`);
            }
            const processedNews = this.processNewsData(data);
            this.log('News data fetched successfully', 'success');
            return processedNews;
        }
        catch (error) {
            throw new Error(`Failed to fetch news: ${error}`);
        }
    }
    async fetchNewsAsync() {
        this.log('Fetching news data using async/await...');
        return this.fetchNewsPromise();
    }
    buildNewsUrl() {
        return `${config_1.CONFIG.NEWS_BASE_URL}?access_key=${config_1.CONFIG.NEWS_API_KEY}&countries=${this.countries}&limit=${this.limit}&sort=published_desc`;
    }
    processNewsData(apiResponse) {
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
exports.NewsComponent = NewsComponent;
//# sourceMappingURL=NewsComponent.js.map