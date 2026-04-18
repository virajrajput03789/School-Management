# School Management API

A production-ready Node.js REST API for managing schools, featuring proximity-based searching using the Haversine formula.

## Features
- Add new schools with geographic coordinates.
- List all schools sorted by distance from a user-provided location.
- Input validation and error handling.
- MySQL database integration.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Environment Config:** dotenv

## Setup Instructions

1. **Clone the repository and navigate to the project folder:**
   ```bash
   cd school-management-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Rename `.env.example` to `.env`.
   - Update the database credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) as per your local MySQL setup.

4. **Database Setup:**
   - Run the provided `schema.sql` script in your MySQL client to create the database and the `schools` table.
   ```bash
   mysql -u root -p < schema.sql
   ```

5. **Run the Application:**
   - For production: `npm start`
   - For development (with hot-reload): `npm run dev`

---

## API Documentation

### 1. Add School
**Endpoint:** `POST /addSchool`

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurugram",
  "latitude": 28.4595,
  "longitude": 77.0266
}
```

**Success Response (201 Created):**
```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

---

### 2. List Schools
**Endpoint:** `GET /listSchools`

**Query Parameters:**
- `latitude` (Float): The user's current latitude.
- `longitude` (Float): The user's current longitude.

**Example Request:**
`GET /listSchools?latitude=28.6139&longitude=77.2090`

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector 45, Gurugram",
    "latitude": 28.4595,
    "longitude": 77.0266,
    "distance_km": 24.35
  }
]
```

---

## Deployment Guide

### Deploying to Render / Railway (Recommended)

1. **Host your Database:**
   - Create a free MySQL database on [Aiven](https://aiven.io/) or [TiDB Cloud](https://www.pingcap.com/tidb-cloud/).
   - Copy the connection details (Host, User, Password, DB Name, Port).
   - Run the `schema.sql` on the cloud database.

2. **Push to GitHub:**
   - Initialize a git repository and push your code (ensure `.env` is NOT pushed by using the provided `.gitignore`).
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Deploy on Render:**
   - Select **New > Web Service**.
   - Connect your GitHub repo.
   - Set **Build Command:** `npm install`
   - Set **Start Command:** `npm start`
   - Go to the **Environment** tab and add all variables from `.env` (DB_HOST, etc.).

4. **Deploy on Railway:**
   - Select **New Project > Deploy from GitHub repo**.
   - Add variables under the **Variables** tab.

---
