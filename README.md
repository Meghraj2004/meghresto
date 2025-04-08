# MeghResto - Indian Restaurant Web Application

A modern web application for the MeghResto Indian restaurant offering online reservations, menu browsing, and more.

## Features

- Interactive menu with filter by categories and dietary preferences
- Online reservation system with email confirmation
- User authentication with Firebase
- Responsive design for all devices
- Modern UI with elegant gold accents

## Technologies Used

- Frontend: React, TailwindCSS, shadcn/ui components
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM
- Authentication: Firebase Auth
- State Management: React Query

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- Firebase account

### Detailed Installation Guide

1. **Clone the repository**:
```bash
git clone <repository-url>
cd meghresto
```

2. **Install dependencies**:
```bash
npm install
```

3. **PostgreSQL Database Setup**:
   
   **Option 1: Using the Setup Script (Recommended)**
   
   We've included a setup script that will automate the database creation process:
   
   ```bash
   # Make the script executable (if needed)
   chmod +x setup-database.sh
   
   # Run the setup script
   ./setup-database.sh
   ```
   
   This script will:
   - Check if PostgreSQL is installed
   - Help you create the database
   - Update your `.env` file with the correct credentials
   - Optionally run the database migration
   
   **Option 2: Manual Setup**
   
   a. Install PostgreSQL on your local machine if not already installed:
      - [Download PostgreSQL](https://www.postgresql.org/download/)
      - Follow installation instructions for your operating system
   
   b. Create a new database:
   ```bash
   # Login to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE meghreso_db;
   
   # Verify the database was created
   \l
   
   # Exit PostgreSQL
   \q
   ```
   
   c. If you prefer using a GUI, you can use pgAdmin or another PostgreSQL client to create the database.

4. **Create Environment Configuration**:

   Create a `.env` file in the root directory with the following variables:
   ```
   # PostgreSQL Database Connection
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/meghreso_db
   PGHOST=localhost
   PGPORT=5432
   PGUSER=postgres
   PGPASSWORD=your_password
   PGDATABASE=meghreso_db
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```
   
   Replace `your_password` with your actual PostgreSQL password and the Firebase values with your Firebase project details.

5. **Generate and Apply Database Schema**:
   ```bash
   # This will create all the necessary tables in your database
   npm run db:push
   ```
   
   This command uses Drizzle ORM to create the database tables based on the schema defined in `shared/schema.ts`.

6. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   
   The application should now be running at: http://localhost:5000

### Setting up Firebase Authentication

1. **Create a Firebase Project**:
   - Go to the [Firebase console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup steps
   - Once created, click on your project to enter its dashboard

2. **Add a Web Application**:
   - In your Firebase project, click the web icon (</>) to add a web app
   - Register your app with a nickname (e.g., "MeghResto Web")
   - No need to set up Firebase Hosting at this point
   - After registration, you'll see configuration details - save these for your `.env` file

3. **Enable Authentication**:
   - In the Firebase console, go to "Authentication" in the left sidebar
   - Click "Get started"
   - Enable the "Google" sign-in method
   - Add your own email as an authorized domain for testing
   
4. **Add Authorized Domains**:
   - Still in Authentication, go to the "Settings" tab
   - Under "Authorized domains", add:
     - `localhost` (for local development)
     - Your production domain when deployed

5. **Copy Firebase Configuration to Environment Variables**:
   - From your project settings (gear icon in the sidebar), go to "General" tab
   - Scroll down to "Your apps" section and find your web app
   - Copy these values to your `.env` file:
     - `apiKey` → VITE_FIREBASE_API_KEY
     - `projectId` → VITE_FIREBASE_PROJECT_ID
     - `appId` → VITE_FIREBASE_APP_ID

### Email Notification Setup (for Reservation Confirmations)

For development and testing purposes, the application currently uses the [Web3Forms](https://web3forms.com/) API for sending email notifications. To set up email notifications:

1. Sign up for a free Web3Forms account
2. Get your API key from the dashboard
3. The application already has a test API key configured

### Troubleshooting

#### Database Connection Issues
If you're experiencing the "Failed to load menu items" error when running locally:
- Ensure PostgreSQL is running and accessible
- Check that your PostgreSQL credentials in the `.env` file are correct
- Verify the database exists: `psql -U postgres -l`
- Make sure you've run `npm run db:push` to create the database schema
- Check PostgreSQL logs for any connection errors

#### Firebase Authentication Issues
- Ensure your Firebase project has Google sign-in method enabled
- Verify that your Firebase configuration in `.env` matches your Firebase project
- Add `localhost` to the authorized domains list in Firebase Authentication settings

#### Menu Items Not Displaying
The application includes a fallback mechanism to display sample menu items if the database connection fails, so you should still see menu items. If you're seeing the sample data warning, check your database connection.

## License

This project is licensed under the MIT License.