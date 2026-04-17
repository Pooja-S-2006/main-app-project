const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const problemRoutes = require('./routes/problems');
const submissionRoutes = require('./routes/submissions');
const leaderboardRoutes = require('./routes/leaderboard');
const contestRoutes = require('./routes/contests');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 auth requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
  skipSuccessfulRequests: true,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'coding-platform-backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/contests', contestRoutes);

// Module integration endpoints
app.get('/api/modules', (req, res) => {
  res.json({
    modules: {
      'lib': {
        name: 'UI Component Library',
        status: 'active',
        description: 'Reusable React components',
        endpoint: '/lib'
      },
      'code-engine': {
        name: 'Code Execution Engine',
        status: 'active',
        description: 'Judge0 API integration',
        endpoint: '/api/execute'
      },
      'problem-module': {
        name: 'Problem Management',
        status: 'active',
        description: 'Coding problems and test cases',
        endpoint: '/api/problems'
      },
      'auth-module': {
        name: 'Authentication Module',
        status: 'active',
        description: 'User authentication with JWT',
        endpoint: '/api/auth'
      },
      'leaderboard-module': {
        name: 'Leaderboard Module',
        status: 'active',
        description: 'User rankings and scores',
        endpoint: '/api/leaderboard'
      }
    }
  });
});

// Proxy endpoints for external services
app.post('/api/execute', async (req, res) => {
  try {
    const codeEngineUrl = process.env.CODE_ENGINE_URL || 'http://localhost:3001';
    const response = await axios.post(`${codeEngineUrl}/api/execute`, req.body, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    logger.error('Code execution proxy error:', error);
    res.status(500).json({ 
      error: 'Code execution service unavailable',
      details: error.message 
    });
  }
});

app.post('/api/run-tests', async (req, res) => {
  try {
    const codeEngineUrl = process.env.CODE_ENGINE_URL || 'http://localhost:3001';
    const response = await axios.post(`${codeEngineUrl}/api/run-tests`, req.body, {
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    logger.error('Test execution proxy error:', error);
    res.status(500).json({ 
      error: 'Test execution service unavailable',
      details: error.message 
    });
  }
});

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
});

module.exports = app;
