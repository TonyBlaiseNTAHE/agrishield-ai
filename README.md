# 🌾 AgriShield AI

> An AI-powered weather intelligence platform that helps smallholder farmers identify optimal planting windows and receive early warnings about weather threats.

---

## 📌 Overview

AgriShield AI is a weather-driven agricultural decision support platform built on top of the WeatherAI API. The platform helps farmers make informed decisions about planting, crop management, and weather-related risks by transforming raw weather data into actionable farming insights.

The system combines:

- Real-time weather monitoring
- Farm management
- Weather history tracking
- Automated advisory generation
- Weather risk detection and alerts
- Farm-specific intelligence reporting

---

## 🎯 Problem Statement

Smallholder farmers often rely on traditional knowledge and unpredictable weather patterns when making planting decisions. Unexpected weather events such as droughts, excessive rainfall, and strong winds can significantly impact crop yields.

AgriShield AI addresses this challenge by:

- Monitoring weather conditions for each farm
- Providing personalized farming advisories
- Identifying weather risks early
- Supporting data-driven planting decisions

---

## 🚀 Features Implemented

### 👨‍🌾 Farmer Management

- Create farmers
- Retrieve all farmers
- Store farmer information
- Associate multiple farms with a farmer

---

### 🌱 Farm Management

- Register farms
- Track crop types
- Store farm coordinates
- Support multiple farms per farmer

---

### 🌦️ WeatherAI Integration

- Integration with WeatherAI API
- Real-time weather retrieval
- Location-based weather intelligence
- Secure API authentication

---

### 📊 Weather Snapshot Storage

- Save weather data into MongoDB
- Maintain weather history
- Store raw WeatherAI responses
- Support future trend analysis

---

### 🧠 Advisory Engine

Generate recommendations based on:

- Temperature
- Humidity
- Wind speed
- Precipitation
- Weather conditions

Example recommendations:

- Suitable planting conditions
- Delay spraying due to strong winds
- Planting opportunity after rainfall
- Monitor weather before taking action

---

### ⚠️ Alert Detection System

Detect potentially harmful conditions such as:

- Extreme wind
- Drought risk
- High temperature events

Future support:

- Frost alerts
- Flood alerts
- Storm alerts

---

### 🔍 Farm Insight Engine

Provides a complete farm intelligence report by:

1. Retrieving farm information
2. Fetching real-time weather
3. Saving weather snapshots
4. Generating advisories
5. Detecting risks
6. Returning a consolidated response

---

## 🏗️ Architecture

```text
Farmer
   │
   ▼
Farm
   │
   ▼
WeatherAI API
   │
   ▼
Weather Service
   │
   ▼
Weather Snapshot Storage
   │
   ▼
Advisory Engine
   │
   ▼
Alert Engine
   │
   ▼
Farm Insight Response
```

---

## 📂 Project Structure

```text
src
├── config
│   └── db.js
│
├── controllers
│   ├── farmer.controller.js
│   ├── farm.controller.js
│   └── weather.controller.js
│
├── models
│   ├── Farmer.js
│   ├── Farm.js
│   ├── WeatherSnapshot.js
│   ├── Advisory.js
│   └── Alert.js
│
├── routes
│   ├── farmer.routes.js
│   ├── farm.routes.js
│   └── weather.routes.js
│
├── services
│   ├── weatherAI.service.js
│   ├── weatherSnapshot.service.js
│   ├── advisory.service.js
│   ├── alert.service.js
│   └── planting.service.js
│
├── app.js
└── index.js
```

---

## 🗄️ Database Models

### Farmer

```javascript
{
  name: String,
  phone: String,
  location: String
}
```

### Farm

```javascript
{
  farmerId: ObjectId,
  cropType: String,
  latitude: Number,
  longitude: Number,
  size: Number
}
```

### WeatherSnapshot

```javascript
{
  farmId: ObjectId,
  temperature: Number,
  humidity: Number,
  windSpeed: Number,
  precipitation: Number,
  weatherCondition: String,
  snapshotDate: Date,
  rawData: Object
}
```

### Advisory

```javascript
{
  farmId: ObjectId,
  message: String,
  riskLevel: String
}
```

### Alert

```javascript
{
  farmId: ObjectId,
  type: String,
  severity: String,
  message: String,
  isResolved: Boolean
}
```

---

## 🔌 API Endpoints

### Farmers

#### Create Farmer

```http
POST /api/farmers
```

Request:

```json
{
  "name": "Tony Blaise",
  "phone": "0780000000",
  "location": "Kigali"
}
```

---

#### Get Farmers

```http
GET /api/farmers
```

---

### Farms

#### Create Farm

```http
POST /api/farms
```

Request:

```json
{
  "farmerId": "FARMER_ID",
  "cropType": "Maize",
  "latitude": -1.944,
  "longitude": 30.061,
  "size": 2.5
}
```

---

#### Get Farms

```http
GET /api/farms
```

---

### Weather Insights

#### Farm Weather Intelligence

```http
GET /api/weather/farm/:farmId/insight
```

Response:

```json
{
  "farm": {},
  "weather": {},
  "snapshot": {},
  "advisories": [],
  "alerts": []
}
```

---

## ⚙️ Backend Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd agrishield-ai/backend
```

---

### 2. Install Dependencies

```bash
npm install
```

Or manually:

```bash
npm install express mongoose cors dotenv
npm install -D nodemon
```

---

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/agrishield

WEATHER_AI_KEY=your_weather_ai_api_key
```

---

### 4. Start MongoDB

Local MongoDB:

```bash
mongod
```

Or use MongoDB Atlas.

---

### 5. Run Backend

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

### Create React Application

Using Vite:

```bash
npm create vite@latest frontend -- --template react
```

---

### Install Dependencies

```bash
cd frontend

npm install

npm install axios react-router-dom
```

---

### Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🎨 Planned Frontend Pages

### Dashboard

Displays:

- Farm information
- Current weather
- Recent advisories
- Active alerts

---

### Farmers Page

- Create farmer
- View farmers

---

### Farms Page

- Register farm
- View farms

---

### Weather Insights Page

Displays:

- Weather information
- Planting recommendations
- Weather alerts
- Weather history

---

## 🔮 Future Improvements

### Phase 2

- Daily weather monitoring
- Automated weather updates
- Scheduled weather collection
- Email notifications
- SMS notifications

---

### Phase 3

- Crop-specific recommendations
- Seasonal planting predictions
- Multi-farm dashboards
- Weather trend visualization
- AI-powered advisory generation

---

## 🧪 Assessment Objectives Demonstrated

This project demonstrates:

- RESTful API Design
- MongoDB Data Modeling
- Third-Party API Integration
- Backend Architecture
- Service-Oriented Design
- Weather Intelligence Processing
- Agricultural Decision Support Systems
- Problem Solving and System Design

---

## 👨‍💻 Author

**Tony Blaise NTAHE**

Software Engineer | Backend Developer | Agricultural Technology Enthusiast

Built as part of a WeatherAI Technical Assessment.
