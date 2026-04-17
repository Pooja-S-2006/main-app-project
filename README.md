# Main App Project

This project uses math-lib-project as a submodule.

## Architecture

This is the main application repository that integrates multiple Git submodules:

### Submodules
- **lib** - Math library functions
- **code-engine** - Code execution engine
- **problem-module** - Problem management
- **auth-module** - Authentication system
- **leaderboard-module** - Leaderboard system

## Features

- **Flask Main Application**: Main orchestrator app.py
- **React Frontend**: Modern UI with Vite and TypeScript
- **Node.js Backend**: API services with MongoDB
- **Modular Design**: Independent submodule development
- **Code Execution**: Judge0 API integration
- **Authentication**: JWT-based security
- **Problem Management**: Coding challenges and solutions
- **Leaderboard**: User rankings and statistics

## Quick Start

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/Pooja-S-2006/main-app-project.git
cd main-app-project

# Initialize and update submodules
git submodule update --init --recursive

# Install dependencies
npm install  # Frontend
pip install flask flask-cors  # Backend

# Start services
python app.py  # Main app
cd frontend && npm run dev  # Frontend
```

## Repository Structure

```
main-app-project/
├── app.py              # Main Flask application
├── templates/           # HTML templates
├── static/             # CSS and JS assets
├── frontend/           # React application
├── backend/            # Node.js services
├── docs/               # Documentation
├── lib/                # Math library submodule
├── code-engine/         # Code engine submodule
├── problem-module/      # Problem module submodule
├── auth-module/         # Auth module submodule
└── leaderboard-module/  # Leaderboard submodule
```

## Development

Each submodule can be developed independently:

```bash
# Work in specific submodule
cd lib
git checkout main
# Make changes...
git commit -m "Update math function"
git push

# Update main repository
cd ..
git add lib
git commit -m "Update lib submodule"
git push
```

## License

MIT License - see LICENSE file for details.
