# Git Submodule Guide

This guide provides comprehensive instructions for working with Git submodules in the Coding Platform project.

## What are Git Submodules?

Git submodules allow you to keep a Git repository as a subdirectory of another Git repository. This enables you to:
- Track specific commits of external repositories
- Maintain independent versioning for modules
- Update modules independently
- Include third-party libraries or dependencies

## Project Structure

```
coding-platform/
|-- .git/
|-- .gitmodules
|-- lib/                    # Submodule: UI Component Library
|-- code-engine/            # Submodule: Code Execution Engine
|-- problem-module/         # Submodule: Problem Management
|-- auth-module/            # Submodule: Authentication
|-- leaderboard-module/     # Submodule: Leaderboard
|-- frontend/               # Main frontend
|-- backend/                # Main backend
|-- app.py                  # Main Flask application
|-- calc.py                 # Math library
```

## Essential Commands

### 1. Initial Setup

#### Clone with Submodules
```bash
# Clone repository and all submodules
git clone --recurse-submodules https://github.com/your-username/coding-platform.git

# Alternative method
git clone https://github.com/your-username/coding-platform.git
cd coding-platform
git submodule init
git submodule update
```

#### Add New Submodule
```bash
# Add a new submodule
git submodule add <repository-url> <path>

# Example: Add analytics module
git submodule add https://github.com/your-org/analytics-module.git analytics-module

# This creates:
# - analytics-module/ directory
# - .gitmodules file entry
# - Git tracking for the submodule
```

### 2. Daily Operations

#### Update Submodules
```bash
# Update all submodules to latest remote
git submodule update --recursive --remote

# Update specific submodule
git submodule update --remote lib

# Pull latest changes in all submodules
git submodule foreach git pull origin main

# Update and initialize submodules
git submodule update --init --recursive
```

#### Check Status
```bash
# Show submodule status
git submodule status

# Output format:
# <commit-hash> <path> (branch)
# + indicates untracked changes
# - indicates missing submodule

# Show detailed status
git submodule summary

# List all submodules
git submodule status --cached
```

### 3. Making Changes

#### Working in Submodules
```bash
# Navigate to submodule
cd lib

# Make changes
git add .
git commit -m "Update button component"
git push origin main

# Return to main repository
cd ..

# Update submodule reference
git add lib
git commit -m "Update lib submodule to latest"
git push
```

#### Sync Submodule Changes
```bash
# After pulling main repo changes
git pull origin main

# Update submodules to match main repo
git submodule update --init --recursive
```

### 4. Advanced Operations

#### Checkout Specific Commit
```bash
# Checkout specific commit in submodule
cd lib
git checkout <commit-hash>

# Update main repo to track this commit
cd ..
git add lib
git commit -m "Pin lib to specific commit"
```

#### Remove Submodule
```bash
# Deinitialize submodule
git submodule deinit -f <submodule-path>

# Remove from index and working tree
git rm -f <submodule-path>

# Remove from .gitmodules
git config -f .gitmodules --remove-section submodule.<submodule-path>
git add .gitmodules

# Clean up
rm -rf .git/modules/<submodule-path>
git commit -m "Remove <submodule-path> submodule"
```

#### Move Submodule
```bash
# Deinit current location
git submodule deinit -f old-path

# Remove old directory
git rm -f old-path

# Add to new location
git submodule add <repository-url> new-path

# Update .gitmodules if needed
git add .gitmodules
git commit -m "Move submodule from old-path to new-path"
```

## .gitmodules File

The `.gitmodules` file tracks submodule configurations:

```ini
[submodule "lib"]
    path = lib
    url = https://github.com/your-org/ui-library.git
    branch = main
[submodule "code-engine"]
    path = code-engine
    url = https://github.com/your-org/code-engine.git
    branch = main
```

### Manual .gitmodules Editing
```bash
# Edit submodule configuration
git config -f .gitmodules submodule.lib.branch develop

# Add branch tracking
git submodule sync --recursive
```

## Best Practices

### 1. Branch Strategy
- Use consistent branch names across submodules
- Tag releases in both main and submodule repos
- Document submodule versions in releases

### 2. Commit Messages
```bash
# Good commit message format
git commit -m "Update lib submodule (abc1234) - Fix button styling"

# Include submodule commit hash
git submodule status
#  abc1234 lib (heads/main)
```

### 3. CI/CD Integration
```yaml
# GitHub Actions example
- name: Update submodules
  run: |
    git submodule update --init --recursive
    git submodule foreach git pull origin main
```

### 4. Development Workflow
```bash
# 1. Start working
git checkout feature-branch
git submodule update --init --recursive

# 2. Make changes in submodule
cd lib
git checkout feature-branch
# ... make changes ...
git commit -m "Feature change"
git push

# 3. Update main repo
cd ..
git add lib
git commit -m "Update lib for feature"
git push
```

## Troubleshooting

### Common Issues

#### Submodule Not Initialized
```bash
# Error: fatal: not a git repository
git submodule update --init --recursive
```

#### Detached HEAD State
```bash
# Check out proper branch
cd lib
git checkout main
git pull origin main
```

#### Merge Conflicts in Submodules
```bash
# Resolve in submodule first
cd lib
git merge main

# Then update main repo
cd ..
git add lib
git commit -m "Resolve submodule merge"
```

#### Submodule Directory Missing
```bash
# Recreate missing submodule
git submodule update --init --recursive
```

### Recovery Commands

#### Reset All Submodules
```bash
# Reset to last committed state
git submodule foreach git reset --hard

# Clean untracked files
git submodule foreach git clean -fd
```

#### Rebuild Submodules
```bash
# Remove and re-add submodule
git submodule deinit -f --all
rm -rf .git/modules/*
git submodule update --init --recursive
```

## Integration with Development Tools

### VS Code
Install "GitLens" extension for better submodule visualization.

### IDE Configuration
```json
// .vscode/settings.json
{
  "git.submoduleSync": true,
  "git.autofetch": true,
  "git.enableSmartCommit": true
}
```

### Docker Integration
```dockerfile
# Dockerfile
COPY .gitmodules ./
RUN git submodule update --init --recursive
```

## Performance Tips

### 1. Sparse Checkout
```bash
# Only fetch needed files
cd lib
git config core.sparsecheckout true
echo "src/components/" > .git/info/sparse-checkout
git read-tree -mu HEAD
```

### 2. Shallow Clones
```bash
# Clone only latest commit
git submodule add --depth 1 <repository-url> <path>
```

### 3. Partial Updates
```bash
# Update only specific submodules
git submodule update lib code-engine
```

## Security Considerations

### 1. Verify Submodule Sources
```bash
# Check submodule URLs
git config -f .gitmodules --get-regexp url

# Verify commit signatures
git submodule foreach git verify-commit HEAD
```

### 2. Restrict Submodule Access
```bash
# Use SSH URLs for private submodules
git submodule set-url -- lib git@github.com:your-org/private-lib.git
```

## Automation Scripts

### Update Script
```bash
#!/bin/bash
# update-submodules.sh
echo "Updating all submodules..."
git submodule update --recursive --remote
git add .
git commit -m "Auto-update submodules $(date)"
git push
```

### Status Script
```bash
#!/bin/bash
# submodule-status.sh
echo "Submodule Status:"
git submodule status
echo ""
echo "Uncommitted changes:"
git submodule foreach git status --porcelain
```

This comprehensive guide should help you effectively manage Git submodules in the Coding Platform project.
