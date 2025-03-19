# Pixilator

An AI-powered image generation platform built with React.js, Node.js, Express, and the DALL-E API.

## Features

- Generate custom images using AI with text prompts
- Real-time image generation with optimized performance
- Image customization and download capabilities
- User-friendly interface
- Efficient caching mechanisms for improved rendering speed

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- AI Integration: DALL-E API
- Additional: Caching mechanisms, efficient data processing

## Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with your DALL-E API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development servers:

   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm start
   ```

## Project Structure

```
pixilator/
├── frontend/          # React.js frontend application
├── backend/           # Node.js/Express backend server
└── README.md         # Project documentation
```
