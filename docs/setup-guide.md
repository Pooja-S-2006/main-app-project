# Setup Guide

This guide provides step-by-step instructions for setting up the Coding Platform development environment.

## Prerequisites

### Required Software
- **Node.js** (v16.0.0 or higher)
- **Python** (v3.8.0 or higher)
- **MongoDB** (v4.4 or higher)
- **Git** (v2.25.0 or higher)

### Optional Software
- **Docker** (v20.10.0 or higher) - for containerized deployment
- **VS Code** - recommended IDE with extensions

### VS Code Extensions (Recommended)
- GitLens - Git integration
- Docker - container support
- MongoDB for VS Code - database management
- Thunder Client - API testing
- ES7+ React/Redux/React-Native snippets - React development

## Installation Steps

### 1. Clone the Repository

```bash
# Clone with all submodules
git clone --recurse-submodules https://github.com/your-username/coding-platform.git
cd coding-platform

# If already cloned without submodules:
git submodule init
git submodule update --recursive
```

### 2. Install System Dependencies

#### On macOS (using Homebrew)
```bash
brew install node python3 mongodb git
```

#### On Ubuntu/Debian
```bash
sudo apt update
sudo apt install nodejs npm python3 python3-pip mongodb git
```

#### On Windows (using Chocolatey)
```bash
choco install nodejs python mongodb git
```

### 3. Install Python Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python packages
pip install flask flask-cors
```

### 4. Install Node.js Dependencies

```bash
# Install dependencies for each module
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd code-engine && npm install && cd ..
cd problem-module && npm install && cd ..
cd auth-module && npm install && cd ..
cd leaderboard-module && npm install && cd ..
cd lib && npm install && cd ..
```

### 5. Set Up Environment Variables

#### Backend Environment
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit the file with your configuration
nano backend/.env
```

Add the following configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/coding-platform

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### Code Engine Environment
```bash
# Copy environment template
cp code-engine/.env.example code-engine/.env

# Edit the file
nano code-engine/.env
```

Add the following configuration:
```env
# Judge0 API Configuration
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key_here
JUDGE0_API_HOST=judge0-ce.p.rapidapi.com

# Server Configuration
PORT=3001
NODE_ENV=development
```

**Note**: Get your Judge0 API key from RapidAPI: https://rapidapi.com/judge0-ce/api/judge0-ce

### 6. Set Up MongoDB

#### Option 1: Local Installation

**On macOS:**
```bash
# Start MongoDB service
brew services start mongodb-community

# Verify installation
mongosh --eval "db.adminCommand('ismaster')"
```

**On Ubuntu/Debian:**
```bash
# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
mongosh --eval "db.adminCommand('ismaster')"
```

**On Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Verify installation
mongosh --eval "db.adminCommand('ismaster')"
```

#### Option 2: Docker
```bash
# Pull and run MongoDB
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Verify connection
mongosh "mongodb://admin:password@localhost:27017"
```

#### Option 3: MongoDB Atlas (Cloud)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend/.env

### 7. Initialize Database

```bash
# Navigate to backend
cd backend

# Run database seeding script
npm run seed

# Or manually create initial data
mongosh coding-platform
```

### 8. Start Development Servers

Open multiple terminal windows:

#### Terminal 1: Main Flask Application
```bash
# Activate virtual environment if not already active
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Start Flask app
python app.py
```

#### Terminal 2: Backend API
```bash
cd backend
npm run dev
```

#### Terminal 3: Code Engine
```bash
cd code-engine
npm run dev
```

#### Terminal 4: Frontend
```bash
cd frontend
npm run dev
```

### 9. Verify Installation

1. **Frontend**: Open http://localhost:3000 in your browser
2. **Backend API**: Test http://localhost:5000/health
3. **Code Engine**: Test http://localhost:3001/health
4. **Main App**: Test http://localhost:5000

## Development Workflow

### 1. Making Changes to Submodules

```bash
# Navigate to submodule
cd lib

# Make changes
git add .
git commit -m "Update component"
git push origin main

# Return to main repo
cd ..

# Update submodule reference
git add lib
git commit -m "Update lib submodule"
git push
```

### 2. Updating All Submodules

```bash
# Update all submodules to latest
git submodule update --recursive --remote

# Commit updates
git add .
git commit -m "Update all submodules"
git push
```

### 3. Running Tests

```bash
# Test individual modules
cd lib && npm test
cd backend && npm test

# Test all modules (if configured)
npm run test:all
```

## Common Issues and Solutions

### Issue 1: Submodule Not Found
**Error**: `fatal: not a git repository`
**Solution**:
```bash
git submodule update --init --recursive
```

### Issue 2: MongoDB Connection Failed
**Error**: `MongoNetworkError: failed to connect`
**Solution**:
1. Check if MongoDB is running: `mongosh --eval "db.adminCommand('ismaster')"`
2. Verify connection string in .env file
3. Check firewall settings

### Issue 3: Port Already in Use
**Error**: `Error: listen EADDRINUSE :::5000`
**Solution**:
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env file
```

### Issue 4: Node Module Dependencies
**Error**: `npm ERR! peer dep missing`
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 5: Judge0 API Not Working
**Error**: `Failed to submit code to Judge0 API`
**Solution**:
1. Verify API key in code-engine/.env
2. Check RapidAPI subscription status
3. Test API key with curl:
```bash
curl -X POST "https://judge0-ce.p.rapidapi.com/submissions" \
  -H "X-RapidAPI-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Production Setup

### 1. Environment Variables

Update all `.env` files for production:
```env
NODE_ENV=production
PORT=80
CORS_ORIGIN=https://yourdomain.com
```

### 2. Build Frontend

```bash
cd frontend
npm run build
```

### 3. Use Process Manager

```bash
# Install PM2 globally
npm install -g pm2

# Start all services
pm2 start backend/src/index.js --name "backend"
pm2 start code-engine/src/index.js --name "code-engine"
pm2 start app.py --name "flask-app" --interpreter python

# Save PM2 configuration
pm2 save
pm2 startup
```

### 4. Set Up Reverse Proxy (Nginx)

```nginx
# /etc/nginx/sites-available/coding-platform
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 5. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### 1. Application Logs

```bash
# View PM2 logs
pm2 logs

# View specific service logs
pm2 logs backend

# View Flask logs
tail -f logs/flask.log
```

### 2. Database Monitoring

```bash
# MongoDB status
mongosh --eval "db.serverStatus()"

# View slow queries
mongosh --eval "db.setProfilingLevel(2)"
mongosh --eval "db.system.profile.find().limit(5)"
```

### 3. Health Checks

Create health check endpoints:
```bash
# Test all services
curl http://localhost:5000/health
curl http://localhost:3001/health
curl http://localhost:3000
```

This setup guide should help you get the Coding Platform running in both development and production environments.
