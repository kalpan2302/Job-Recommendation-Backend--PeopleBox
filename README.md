
# Job Recommendation Backend

This project is a backend service for an  job recommendation system that matches user profiles with relevant job postings based on skills, experience, and preferences.

## Documentation Link

- Here is detail [Documentation](https://docs.google.com/document/d/14_6iN9cEQikA4y7YPERIMjLJ5VYlwkuVk2Frjf2IFB4/edit?usp=drive_link) of Job Recommendation Backend


## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Testing](#testing)
  
## Technologies
- **Node.js**
- **Express.js** (RESTful API)
- **MongoDB** (Database)
- **Postman** (API Testing)

## Features
- REST API that accepts user profiles and returns job recommendations.
- Matching logic based on skills, experience, and user preferences.
- MongoDB integration for job postings and user profiles.
- Proper error handling for API requests and database operations.

## Folder Structure
```
├── controllers
│   └── UserJobProfile.Controller.js   # Handles recommendation logic
├── models
│   └── JobPost.models.js                   # Job Postings schema
│   └── UserProfile.models.js                  # User Profiles schema
├── routes
│   └── Profile.routes.js       # API routes for job recommendation
├──connection                   # MongoDB connection setup         
├── app.js                             # Main entry point (Express server)
├── package.json                       # Dependencies and scripts
└── README.md                          # Documentation
```

## Setup Instructions

### 1. Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local or cloud instance)

### 2. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/kalpan2302/Job-Recommendation-Backend--PeopleBox.git
cd Job-Recommendation-Backend--PeopleBox
```

### 3. Install Dependencies
Navigate to the project directory and install the necessary dependencies:
```bash
npm install
```

### 4. Set Up MongoDB
If you haven't already, set up a MongoDB instance. You can either:
- Use a **local MongoDB server**.
- Use **MongoDB Atlas** for a cloud-based solution.

Create a \`.env\` file in the root directory with the following content, replacing \`<your-mongodb-uri>\` with your MongoDB connection string:
```
MONGODB_URI=mongodb://127.0.0.1:27017/Job_Recommandation
PORT=3000
```

### 5. Run the Server
Start the server:
```bash
npm start
```

By default, the service will run on \`http://localhost:3000\`.

### 6. Add Mock Job Data (Optional)
You can populate the MongoDB database with mock job postings. To do so, you can use a MongoDB client (e.g., MongoDB Compass) or create a script to seed the database.

## API Endpoints

### POST \`/profile\`
- **Description:** Returns job recommendations for a given user profile.
- **Request Head:**
    ```
        content-type : application/json
    ```
- **Request Body:** (JSON)
    ```json
    {
      "name": "John Doe",
      "skills": ["JavaScript", "Node.js", "React"],
      "experience_level": "Intermediate",
      "preferences": {
        "desired_roles": ["Software Engineer", "Full Stack Developer"],
        "locations": ["San Francisco", "Remote"],
        "job_type": "Full-Time"
      }
    }
    ```
- **Response:** (JSON)
    ```json
    [
      {
        "job_title": "Software Engineer",
        "company": "Tech Solutions Inc.",
        "location": "San Francisco",
        "job_type": "Full-Time",
        "required_skills": ["JavaScript", "React", "Node.js"],
        "experience_level": "Intermediate"
      }
    ]
    ```

