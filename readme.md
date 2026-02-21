
# Health Care System

A comprehensive healthcare management system designed to streamline patient records, appointments, and medical services.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** package manager

## Quick Start Guide


### Step 1: Clone the Repository
git clone git@github.com:shashikesh203/dotlinker-core.git
                     or
git clone https://github.com/shashikesh203/dotlinker-core.git

git checkout dev (Switch to dev branch)

cd dotlinker-core

open repo in any editor

## Step 2: Set Up Environment Variables
Create a .env file in the root directory.
Option A: Copy from example file
cp .env.example .env


### Step 3: Install Dependencies
npm install


### Step 4: Start the Development Server
npm run dev
Your application should now be running at http://localhost:4000

### STEP % Check Health route

curl --location 'http://localhost:4000/health'

response
{
    "status": "OK",
    "message": "Health check passed!"
}

## API Documentation & Postman Collection
All API endpoints are documented and tested using Postman.
Postman Collection URL: https://documenter.getpostman.com/view/50892866/2sBXcEk1BB
