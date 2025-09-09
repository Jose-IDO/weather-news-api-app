 # Async Weather & News Dashboard

A modular TypeScript application that demonstrates different asynchronous programming patterns by fetching weather data and news headlines from external APIs using a component-based architecture.

## Architecture

This project uses a component-based architecture with the following components:

### Core Components

- **`BaseComponent`** - Abstract base class for all components with common functionality
- **`WeatherComponent`** - Handles weather data fetching and processing
- **`NewsComponent`** - Manages news data fetching and processing  
- **`DisplayComponent`** - Handles all display and formatting logic
- **`AsyncManager`** - Orchestrates different async patterns using other components

### Implementation Components

- **`callbackVersion.ts`** - Callback-based implementation
- **`promiseVersion.ts`** - Promise-based implementation
- **`asyncAwaitVersion.ts`** - Async/Await implementation

## Features

- **Modular Architecture**: Component-based design for better maintainability
- **Weather Data**: Fetches current weather information from OpenWeatherMap API
- **News Headlines**: Retrieves latest news from MediaStack API
- **Multiple Async Patterns**: Implements the same functionality using all three async approaches
- **Error Handling**: Comprehensive error handling across all components
- **Parallel Execution**: Demonstrates `Promise.all()` for simultaneous requests
- **Race Conditions**: Shows `Promise.race()` for fastest response scenarios
- **Logging**: Built-in logging system for debugging and monitoring

## Installation

1. Navigate to the project folder:
   ```bash
   cd C:\Users\%USERNAME%\Documents\weather-news-api-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Run All Versions
```bash
npm start
```

### Run Specific Versions
```bash
# Callback version
npm run callback

# Promise version  
npm run promise

# Async/Await version
npm run async
```

### Development Mode
```bash
# Run with ts-node (no build required)
npm run dev:callback
npm run dev:promise
npm run dev:async
```

## Project Structure

```
weather-news-api-app/
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── config/
│   │   └── index.ts
│   ├── components/
│   │   ├── BaseComponent.ts
│   │   ├── WeatherComponent.ts
│   │   ├── NewsComponent.ts
│   │   ├── DisplayComponent.ts
│   │   └── AsyncManager.ts
│   ├── callbackVersion.ts
│   ├── promiseVersion.ts
│   ├── asyncAwaitVersion.ts
│   └── index.ts
├── package.json                  # Project configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Component Details

### BaseComponent
- Abstract base class for all components
- Provides common functionality like logging and error handling
- Manages component state (active/inactive)

### WeatherComponent
- Handles all weather-related operations
- Supports all three async patterns (callbacks, promises, async/await)
- Configurable coordinates
- Built-in error handling and logging

### NewsComponent
- Manages news data fetching and processing
- Configurable countries and article limits
- Supports all three async patterns
- Comprehensive error handling

### DisplayComponent
- Handles all display and formatting logic
- Consistent output formatting across all versions
- Error display utilities
- Success message formatting

### AsyncManager
- Orchestrates different async patterns
- Manages component interactions
- Demonstrates Promise.all() and Promise.race()
- Handles complex async scenarios

## Technologies Used

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **node-fetch** - HTTP client for promises
- **OpenWeatherMap API** - Weather data
- **MediaStack API** - News headlines

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run all versions
- `npm run callback` - Run callback version only
- `npm run promise` - Run promise version only
- `npm run async` - Run async/await version only
- `npm run dev:*` - Run in development mode with ts-node

## Quick Start

1. Open Command Prompt or PowerShell
2. Navigate to: `cd C:\Users\%USERNAME%\Documents\weather-news-api-app`
3. Install: `npm install`
4. Build: `npm run build`
5. Run: `npm start`


## Sample Console Outputs

### Callback Version
```
ASYNC WEATHER & NEWS DASHBOARD
==================================================
Implementation: Callbacks
==================================================

WEATHER INFORMATION
==================================================
Location: Example City, EX
Temperature: 19°C (feels like 19°C)
Condition: Clouds - scattered clouds
Humidity: 71%
Wind Speed: 1.2 m/s
Icon: 03n

NEWS HEADLINES
==================================================
1. Example headline one
   Example description one
   Source: example-source
   Published: 09/09/2025
   URL: https://example.com/article-one
   Category: general

Callback version completed
```

### Promise Version
```
ASYNC WEATHER & NEWS DASHBOARD
==================================================
Implementation: Promises
==================================================
Running sequential promise execution...

WEATHER INFORMATION
==================================================
Location: Example City, EX
Temperature: 19°C (feels like 19°C)
Condition: Clouds - scattered clouds

NEWS HEADLINES
==================================================
1. Example headline one

Sequential promise execution completed

Running parallel promise execution...
Parallel promise execution completed

Running Promise.race() example...
Promise.race() completed
```

### Async/Await Version
```
ASYNC WEATHER & NEWS DASHBOARD
==================================================
Implementation: Async/Await
==================================================
Running sequential async/await execution...

WEATHER INFORMATION
==================================================
Location: Example City, EX
Temperature: 19°C (feels like 19°C)
Condition: Clouds - scattered clouds

NEWS HEADLINES
==================================================
1. Example headline one

Sequential async/await completed

Running parallel async/await execution...
Parallel async/await completed
```
