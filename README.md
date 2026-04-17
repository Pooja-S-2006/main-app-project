# Coding Platform - Modular DevOps Project

A comprehensive coding platform with modular architecture using Git submodules, featuring real-time code execution, problem solving, and competitive programming.

## Architecture Overview

This project demonstrates modular design and DevOps practices using Git submodules. Each module is treated as an independent repository with its own version control.

### Main Repository
The main repository handles routing and integration of all modules using Flask (app.py) and serves as the orchestrator for the entire platform.

### Submodules

#### 1. **lib** - UI Component Library
- **Purpose**: Reusable React components (buttons, navbar, editor layout, modals)
- **Tech Stack**: React, TypeScript, TailwindCSS, Storybook
- **Path**: `lib/`

#### 2. **code-engine** - Code Execution Engine
- **Purpose**: Backend service to send code to Judge0 API
- **Tech Stack**: Node.js, Express, Judge0 API
- **Path**: `code-engine/`

#### 3. **problem-module** - Problem Management
- **Purpose**: Manage coding problems, descriptions, constraints, and test cases
- **Tech Stack**: Node.js, Express, MongoDB
- **Path**: `problem-module/`

#### 4. **auth-module** - Authentication Module
- **Purpose**: User authentication (signup/login/logout) with JWT
- **Tech Stack**: Node.js, Express, MongoDB, JWT, bcrypt
- **Path**: `auth-module/`

#### 5. **leaderboard-module** - Leaderboard Module
- **Purpose**: Track user scores and rankings
- **Tech Stack**: Node.js, Express, MongoDB, Caching
- **Path**: `leaderboard-module/`

## Features

- **Code Editor Interface**: VS Code-style editor with syntax highlighting
- **Multi-language Support**: Python, JavaScript, Java, C++, C, C#
- **Real-time Code Execution**: Integration with Judge0 API
- **Problem Solving**: Submit solutions and evaluate against test cases
- **User Authentication**: JWT-based secure authentication system
- **Leaderboard**: Global rankings and statistics
- **Responsive UI**: Modern dark theme with mobile support
- **Modular Architecture**: Independent development and versioning

## Tech Stack

### Frontend
- **React** with Vite
- **TypeScript**
- **TailwindCSS**
- **Monaco Editor**
- **React Query**
- **Framer Motion**

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Judge0 API** for code execution
- **Winston** for logging

### DevOps
- **Git Submodules** for modular architecture
- **Docker** (optional for containerization)
- **GitHub Actions** (for CI/CD)

## Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB
- Git

### Installation

1. **Clone the repository with submodules:**
```bash
git clone --recurse-submodules https://github.com/your-username/coding-platform.git
cd coding-platform
```

2. **If you already cloned without submodules:**
```bash
git submodule init
git submodule update --recursive
```

3. **Install dependencies for each module:**
```bash
# Main Flask app
pip install flask flask-cors

# Frontend
cd frontend && npm install

# Backend services
cd ../backend && npm install
cd ../code-engine && npm install
cd ../problem-module && npm install
cd ../auth-module && npm install
cd ../leaderboard-module && npm install

# UI Library
cd ../lib && npm install
```

4. **Set up environment variables:**
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp code-engine/.env.example code-engine/.env

# Edit the files with your configurations
```

5. **Start MongoDB:**
```bash
# Using MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

6. **Run the application:**
```bash
# Terminal 1: Main Flask app
python app.py

# Terminal 2: Backend services
cd backend && npm run dev

# Terminal 3: Code engine
cd code-engine && npm run dev

# Terminal 4: Frontend
cd frontend && npm run dev
```

## Git Submodule Commands

### Adding a New Submodule
```bash
# Add a new submodule
git submodule add <repository-url> <path>

# Example: Adding a new analytics module
git submodule add https://github.com/your-org/analytics-module.git analytics-module
```

### Updating Submodules
```bash
# Update all submodules to latest commit
git submodule update --recursive --remote

# Update specific submodule
git submodule update --remote <submodule-path>

# Pull latest changes for all submodules
git submodule foreach git pull origin main
```

### Cloning with Submodules
```bash
# Clone repository with all submodules
git clone --recurse-submodules <repository-url>

# Alternative method
git clone <repository-url>
cd <repository-name>
git submodule init
git submodule update
```

### Working with Submodules
```bash
# Navigate to submodule directory
cd lib

# Make changes and commit within submodule
git add .
git commit -m "Update component"
git push

# Return to main repository
cd ..

# Update submodule reference in main repo
git add lib
git commit -m "Update lib submodule"
git push
```

### Checking Submodule Status
```bash
# Show submodule status
git submodule status

# Show submodule summary
git submodule summary
```

### Removing Submodules
```bash
# Remove submodule
git submodule deinit -f <submodule-path>
git rm -f <submodule-path>
git commit -m "Remove submodule"

# Clean up submodule directory
rm -rf .git/modules/<submodule-path>
```

## Development Workflow

### Module Development
1. Navigate to the submodule directory
2. Make changes and test locally
3. Commit and push changes to submodule repository
4. Update submodule reference in main repository
5. Test integration

### Version Management
- Each submodule has its own versioning
- Main repository tracks specific commits of each submodule
- Use semantic versioning for releases
- Tag releases in both main and submodule repositories

### Testing Integration
```bash
# Test all modules together
npm run test:integration

# Test individual modules
cd lib && npm test
cd backend && npm test
```

## API Endpoints

### Main Flask App (Port 5000)
- `GET /` - Main application
- `GET /api/submodules` - List all submodules
- `POST /api/setup` - Initialize project structure
- `POST /api/git/submodule/add` - Add submodule
- `POST /api/git/submodule/update` - Update submodules
- `POST /api/math/calculate` - Math calculations

### Backend API (Port 5000)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/problems` - List problems
- `POST /api/execute` - Execute code
- `GET /api/leaderboard` - Get leaderboard

### Code Engine (Port 3001)
- `POST /api/execute` - Execute code
- `POST /api/run-tests` - Run test cases
- `GET /api/languages` - Get supported languages

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coding-platform
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Code Engine (.env)
```env
PORT=3001
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your-rapidapi-key
```

## Deployment

### Using Docker
```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Manual Deployment
1. Deploy each submodule to its own server/container
2. Update environment variables for production
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates
5. Configure monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes in the appropriate submodule
4. Test integration with main repository
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions and support:
- Create an issue on GitHub
- Check the documentation
- Review the submodule-specific READMEs