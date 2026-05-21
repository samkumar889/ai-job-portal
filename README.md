
# AI Powered Job Portal & Resume Analyzer

A modern full-stack job portal and resume analyzer built with the MERN stack, featuring AI-powered resume analysis, ATS scoring, and more.

## Features

### User Features
- User authentication (signup/login) with JWT
- Profile management
- Resume upload and AI analysis
- ATS score calculation
- AI-generated resume feedback and suggestions
- AI-powered interview questions
- Job search and application
- Job saving functionality
- Application history

### Recruiter Features
- Recruiter dashboard
- Job posting, editing, and deletion
- Applicant management
- Application status updates (accept/reject)
- Resume viewing
- Analytics dashboard

### General Features
- Dark/light mode
- Responsive design
- Modern UI with animations
- Role-based access control

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Redux Toolkit
- Framer Motion

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary (optional for file uploads)

### Database
- MongoDB (MongoDB Atlas)

### AI Integration
- OpenAI API

## Installation

### Prerequisites
- Node.js (v18 or later)
- Git
- MongoDB Atlas account (free tier)
- OpenAI API key
- Cloudinary account (free tier)

## MongoDB Atlas Setup (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new project
3. Build a database (choose M0 - free tier)
4. Create a database user (username and password)
5. Add your IP address to the IP access list (or allow 0.0.0.0/0 for development)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string and replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `job-portal`

## Cloudinary Setup (Free Tier)

1. Go to [Cloudinary](https://cloudinary.com) and create a free account
2. After logging in, go to your Dashboard
3. Copy your:
   - Cloud Name
   - API Key
   - API Secret

## Local Development

### Backend Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/job-portal?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
# or
npm start
```

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Deployment to Render

### 1. Prepare Your Code
- Push your code to GitHub (make sure .gitignore includes node_modules and .env)

### 2. Deploy Backend to Render
1. Go to [Render](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the web service:
   - Name: job-portal-server
   - Root Directory: `server`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (under "Advanced" → "Environment Variables"):
   - `PORT`: 10000 (Render uses this by default)
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `NODE_ENV`: production
6. Click "Create Web Service"

### 3. Deploy Frontend to Render
1. In Render, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure the static site:
   - Name: job-portal-client
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Add environment variable (if needed for API URL):
   - `VITE_API_URL`: Your backend Render URL (e.g., `https://job-portal-server.onrender.com`)
5. Click "Create Static Site"
6. After deployment, set up a rewrite rule for client-side routing:
   - Go to your static site → "Redirects/Rewrites"
   - Add a rule:
     - Source: `/*`
     - Destination: `/index.html`
     - Action: `Rewrite`

### 4. Update Frontend API Base URL
Update your frontend API calls to use the deployed backend URL instead of `http://localhost:5000`

## Usage

1. Open your browser and go to your deployed frontend URL
2. Sign up as a user or recruiter
3. Explore the features!

## License

MIT
