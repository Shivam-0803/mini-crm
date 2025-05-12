# Mini CRM

A modern customer relationship management system with AI-powered features for segmentation and message generation.

## Features

- **AI-Powered Messaging**: Generate customized message suggestions for your campaigns
- **Customer Segmentation**: Create and manage customer segments with AI assistance
- **Campaign Management**: Create, schedule, and track marketing campaigns
- **Analytics**: Track campaign performance and customer engagement
- **Responsive Design**: Modern UI that works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, TailwindCSS, Radix UI components
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI Integration**: OpenAI API for message suggestions and segment rules

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB
- OpenAI API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Shivam-0803/mini-crm.git
   cd mini-crm
   ```

2. Install dependencies
   ```
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../crm-frontend
   npm install
   ```

3. Environment Configuration
   - Create a `.env` file in the backend directory based on `.env.example`
   - Add your OpenAI API key and other configuration options

4. Start the development servers
   ```
   # Start backend server
   cd backend
   npm run dev
   
   # Start frontend server
   cd ../crm-frontend
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the backend directory with these variables:

```
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/mini_crm

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h
```

## License

MIT 