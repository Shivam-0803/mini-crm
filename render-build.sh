#!/bin/bash

# Navigate to the frontend directory
cd crm-frontend

# Install dependencies
npm install

# Build the application
npm run build

# Ensure dist directory exists and display its contents
mkdir -p dist
ls -la dist

# Copy build output to the right location
# (Only needed if Vite is outputting to a different directory than expected)
# cp -r build/* dist/

# Return to the root directory
cd ..

echo "Build completed successfully!" 