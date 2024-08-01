# Tassc
Title: Tassc - Task Management Application

1. Project Overview
- Description: Tassc is a comprehensive task management application built with React for the frontend and Node.js with Express.js for the backend. The application allows users to manage tasks with features for login, registration, task creation, updating, and deletion. It includes a secure authentication system and a user-friendly interface.
- Frontend: React
- Backend: Node.js, Express.js

## Features:
- User authentication (login and registration)
- Task creation, updating, and deletion
- Task status management (pending/completed)
- Responsive design for various devices

2. Installation and Setup
## Prerequisites:
- Node.js 
- Docker (optional, if using Docker for deployment)

Clone the Repository:
``` https://github.com/KirthiMaharaj055/Tassc.git ```
```cd tassc ```

## Frontend Setup:
1. Navigate to the client directory.
2. Install dependencies:
```npm install```
3. Start the development server:
```npm start```

## Backend Setup:
1. Navigate to the server directory.
2. Install dependencies:
```npm install```
3. Start the server:
```npm run server or npm start```

## Docker Setup (Optional):

1. Build and run the Docker containers:
```docker-compose up --build```

## Root project
1. Run server and client:
```npm run dev```

3. Usage
## Running Locally:
1. Ensure the backend server is running.
2. Open another terminal and navigate to the client directory.
3. Run the frontend server using:
```npm start```
4. Open your browser and navigate to http://localhost:3000 or http://192.168.0.180:3000.

## Accessing the API:
- Base URL: http://localhost:3000/api

##Endpoints:
- POST /api/auth/login - Login a user
- POST /api/auth/register - Register a new user
- GET /api/tasks - Fetch all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/ - Update a task
- DELETE /api/tasks/ - Delete a task

