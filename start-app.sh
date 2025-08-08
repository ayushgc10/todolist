#!/bin/bash

# Script to start both backend and frontend servers
echo "🚀 Starting Todo List Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Function to install dependencies for a directory
install_deps() {
    local dir=$1
    if [ -d "$dir" ]; then
        echo "📦 Installing dependencies for $dir..."
        cd "$dir"
        npm install
        cd ..
    fi
}

# Install dependencies for both backend and frontend
install_deps "backend"
install_deps "frontend"

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "📋 To start the application:"
echo "1. Open a terminal and run: cd backend && npm start"
echo "2. Open another terminal and run: cd frontend && npm start"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "💡 Tip: You can run both commands in separate terminal windows/tabs"
