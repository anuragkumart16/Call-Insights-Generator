# Call Insight Generator

Call Insight Generator is a full-stack application designed to analyze audio files or links and generate insights from sales or customer service calls. The application provides a summary, key points, agent performance evaluation, and actionable recommendations based on the audio transcription.

## Features

### Frontend
- Built with React and Vite for a fast and modern development experience.
- Responsive UI for uploading audio files or providing audio links.
- Displays insights and allows exporting reports as PDFs.
- Error handling and splash screen for better user experience.

### Backend
- Built with Node.js and Express.
- MongoDB for storing call insights.
- Integration with Deepgram API for audio transcription.
- Integration with Gemini API for generating insights.
- Cloudinary for file uploads.

## Prerequisites

- Node.js (v16 or later)
- MongoDB instance
- Cloudinary account
- Deepgram API key
- Gemini API key

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd call-insight-generator
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd Frontend
   npm install
   cd ../Backend
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both `Frontend` and `Backend` directories.
   - Refer to the `.env` files in the workspace for required variables.

## Running the Application

### Backend
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Start the server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the application in your browser at `http://localhost:5173`.

## Project Structure

### Frontend
- `src/components`: Contains reusable React components.
- `src/utils`: Utility functions for API calls and health checks.
- `public`: Static assets.

### Backend
- `src/controllers`: Handles API logic.
- `src/models`: MongoDB models.
- `src/routes`: API routes.
- `src/utils`: Helper functions for various tasks.
- `public/temp`: Temporary storage for uploaded files.

## API Endpoints

### Health Check
- **GET** `/api/v1/healthcheck`

### Audio Insights
- **POST** `/api/v1/audioinsight/link`: Analyze audio from a public link.
- **POST** `/api/v1/audioinsight/file`: Analyze uploaded audio files.

## Technologies Used

### Frontend
- React
- Vite
- React Spinners
- HTML2PDF.js

### Backend
- Node.js
- Express
- MongoDB
- Cloudinary
- Deepgram API
- Gemini API

## License

This project is licensed under the MIT License.