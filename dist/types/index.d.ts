export interface WeatherData {
    location: string;
    country: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    description: string;
    icon: string;
}
export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    source: string;
    image?: string;
    publishedAt: string;
    author?: string;
    category: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
export interface WeatherApiResponse {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
    };
    cod?: number;
    message?: string;
}
export interface NewsApiResponse {
    data: Array<{
        title: string;
        description: string;
        url: string;
        source: string;
        image?: string;
        published_at: string;
        author?: string;
        category: string;
    }>;
    error?: {
        info: string;
        code?: string;
    };
}
export interface Coordinates {
    lat: number;
    lon: number;
}
//# sourceMappingURL=index.d.ts.map