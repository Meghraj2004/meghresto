#!/bin/bash

# Script to help set up the PostgreSQL database for MeghResto

echo "MeghResto Database Setup Script"
echo "==============================="
echo

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install PostgreSQL first."
    echo "You can download it from: https://www.postgresql.org/download/"
    exit 1
fi

echo "PostgreSQL is installed."

# Get database credentials
read -p "Enter PostgreSQL username [postgres]: " PG_USER
PG_USER=${PG_USER:-postgres}

read -s -p "Enter PostgreSQL password: " PG_PASSWORD
echo
read -p "Enter database name [meghreso_db]: " DB_NAME
DB_NAME=${DB_NAME:-meghreso_db}

# Create the database
echo "Creating database '$DB_NAME'..."
PGPASSWORD=$PG_PASSWORD psql -U $PG_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Database created successfully!"
else
    echo "Checking if database already exists..."
    DB_EXISTS=$(PGPASSWORD=$PG_PASSWORD psql -U $PG_USER -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")
    if [ "$DB_EXISTS" = "1" ]; then
        echo "Database '$DB_NAME' already exists. Continuing..."
    else
        echo "Failed to create database. Please check your PostgreSQL credentials and try again."
        exit 1
    fi
fi

# Create/update .env file
echo "Updating .env file with database credentials..."

# Check if .env file exists
if [ -f .env ]; then
    # Backup existing .env file
    cp .env .env.backup
    echo "Backed up existing .env file to .env.backup"
fi

# Create or update DATABASE_URL in .env
if [ -f .env ]; then
    # Update existing .env file
    sed -i.bak '/^DATABASE_URL=/d' .env
    sed -i.bak '/^PGHOST=/d' .env
    sed -i.bak '/^PGPORT=/d' .env
    sed -i.bak '/^PGUSER=/d' .env
    sed -i.bak '/^PGPASSWORD=/d' .env
    sed -i.bak '/^PGDATABASE=/d' .env
    echo "# PostgreSQL Database Connection" >> .env
    echo "DATABASE_URL=postgresql://$PG_USER:$PG_PASSWORD@localhost:5432/$DB_NAME" >> .env
    echo "PGHOST=localhost" >> .env
    echo "PGPORT=5432" >> .env
    echo "PGUSER=$PG_USER" >> .env
    echo "PGPASSWORD=$PG_PASSWORD" >> .env
    echo "PGDATABASE=$DB_NAME" >> .env
else
    # Create new .env file
    echo "# PostgreSQL Database Connection" > .env
    echo "DATABASE_URL=postgresql://$PG_USER:$PG_PASSWORD@localhost:5432/$DB_NAME" >> .env
    echo "PGHOST=localhost" >> .env
    echo "PGPORT=5432" >> .env
    echo "PGUSER=$PG_USER" >> .env
    echo "PGPASSWORD=$PG_PASSWORD" >> .env
    echo "PGDATABASE=$DB_NAME" >> .env
    echo "" >> .env
    echo "# Firebase Configuration" >> .env
    echo "VITE_FIREBASE_API_KEY=your_firebase_api_key" >> .env
    echo "VITE_FIREBASE_PROJECT_ID=your_firebase_project_id" >> .env
    echo "VITE_FIREBASE_APP_ID=your_firebase_app_id" >> .env
fi

echo "Environment variables updated in .env file."

# Prompt to run the database migration
echo
echo "Next steps:"
echo "1. Make sure you have installed all npm dependencies: npm install"
echo "2. Push the database schema: npm run db:push"
echo "3. Start the application: npm run dev"
echo

# Ask if user wants to push the schema now
read -p "Do you want to push the database schema now? (y/n): " PUSH_SCHEMA
if [[ $PUSH_SCHEMA =~ ^[Yy]$ ]]; then
    echo "Running schema push..."
    npm run db:push
    if [ $? -eq 0 ]; then
        echo "Database schema created successfully!"
    else
        echo "Failed to create database schema. Please run 'npm run db:push' manually."
    fi
fi

echo
echo "Setup complete!"
echo "You can now start the application with: npm run dev"