# Quiz Platform Backend

This is the backend for the Quiz Platform application, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, reset password)
- Role-based authorization (admin, user)
- Quiz management (create, read, update, delete)
- Quiz results tracking
- Study materials management
- Profile management
- Email notifications

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email functionality
- Multer for file uploads

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (see `.env.example`)
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:resettoken` - Reset password

### Quiz

- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:id` - Get single quiz
- `POST /api/quiz` - Create quiz (admin only)
- `PUT /api/quiz/:id` - Update quiz (admin only)
- `DELETE /api/quiz/:id` - Delete quiz (admin only)
- `POST /api/quiz/:id/submit` - Submit quiz results

### Study Materials

- `GET /api/study-materials` - Get all study materials
- `GET /api/study-materials/:id` - Get single study material
- `POST /api/study-materials` - Create study material (admin only)
- `PUT /api/study-materials/:id` - Update study material (admin only)
- `DELETE /api/study-materials/:id` - Delete study material (admin only)

### Email

- `POST /api/email/contact` - Send contact form
- `POST /api/email/subscribe` - Subscribe to newsletter

### Profile

- `PUT /api/profile` - Update user profile
- `PUT /api/profile/password` - Update password 