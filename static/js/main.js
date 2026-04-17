// Main JavaScript for Coding Platform
document.addEventListener('DOMContentLoaded', function() {
    loadModules();
    setupEventListeners();
});

// Load modules dynamically
async function loadModules() {
    try {
        const response = await fetch('/api/submodules');
        const modules = await response.json();
        
        const container = document.getElementById('modules-container');
        container.innerHTML = '';
        
        Object.entries(modules).forEach(([key, module]) => {
            const moduleCard = createModuleCard(key, module);
            container.appendChild(moduleCard);
        });
    } catch (error) {
        console.error('Error loading modules:', error);
    }
}

// Create module card element
function createModuleCard(key, module) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    const icons = {
        'lib': 'fas fa-cube',
        'code-engine': 'fas fa-cogs',
        'problem-module': 'fas fa-puzzle-piece',
        'auth-module': 'fas fa-shield-alt',
        'leaderboard-module': 'fas fa-trophy'
    };
    
    col.innerHTML = `
        <div class="card bg-dark border-secondary h-100 module-card">
            <div class="card-body text-center">
                <div class="module-icon text-primary">
                    <i class="${icons[key] || 'fas fa-folder'}"></i>
                </div>
                <h5 class="card-title">${module.name}</h5>
                <p class="card-text small">${module.description}</p>
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-sm btn-outline-primary" onclick="exploreModule('${key}')">
                        <i class="fas fa-eye"></i> Explore
                    </button>
                    <button class="btn btn-sm btn-outline-success" onclick="setupModule('${key}')">
                        <i class="fas fa-cog"></i> Setup
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Language selection
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            updateCodeTemplate(this.value);
        });
    }
}

// Update code template based on language
function updateCodeTemplate(language) {
    const editor = document.getElementById('code-editor');
    const templates = {
        'python': 'def hello_world():\n    print("Hello, World!")\n    return "Success"\n\nhello_world()',
        'javascript': 'function helloWorld() {\n    console.log("Hello, World!");\n    return "Success";\n}\n\nhelloWorld();',
        'java': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        'cpp': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}'
    };
    
    if (editor && templates[language]) {
        editor.value = templates[language];
    }
}

// Run code
async function runCode() {
    const code = document.getElementById('code-editor').value;
    const language = document.getElementById('language-select').value;
    const outputConsole = document.getElementById('output-console');
    
    outputConsole.textContent = 'Running code...';
    
    try {
        // Simulate code execution (in real app, this would call backend)
        setTimeout(() => {
            if (language === 'python' && code.includes('hello_world')) {
                outputConsole.textContent = 'Hello, World!\nSuccess';
            } else if (language === 'javascript' && code.includes('helloWorld')) {
                outputConsole.textContent = 'Hello, World!\nSuccess';
            } else if (language === 'java' && code.includes('System.out.println')) {
                outputConsole.textContent = 'Hello, World!';
            } else if (language === 'cpp' && code.includes('cout')) {
                outputConsole.textContent = 'Hello, World!';
            } else {
                outputConsole.textContent = 'Code executed successfully!';
            }
        }, 1000);
    } catch (error) {
        outputConsole.textContent = `Error: ${error.message}`;
    }
}

// Submit code
function submitCode() {
    const code = document.getElementById('code-editor').value;
    const language = document.getElementById('language-select').value;
    
    // Show submission feedback
    showNotification('Code submitted successfully!', 'success');
    
    // In real app, this would send to backend for evaluation
    console.log('Submitting code:', { language, code });
}

// Explore module
function exploreModule(moduleName) {
    showNotification(`Exploring ${moduleName} module...`, 'info');
    // In real app, this would navigate to module details
}

// Setup module
async function setupModule(moduleName) {
    try {
        showNotification(`Setting up ${moduleName} module...`, 'info');
        
        // Call backend to setup module
        const response = await fetch('/api/setup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            showNotification(`Module ${moduleName} setup successfully!`, 'success');
        } else {
            showNotification(`Setup failed: ${result.message}`, 'danger');
        }
    } catch (error) {
        showNotification(`Setup error: ${error.message}`, 'danger');
    }
}

// Start coding
function startCoding() {
    document.getElementById('problems').scrollIntoView({
        behavior: 'smooth'
    });
}

// View documentation
function viewDocs() {
    window.location.href = '/docs';
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Git operations
async function addSubmodule(name, url) {
    try {
        const response = await fetch('/api/git/submodule/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, url })
        });
        
        const result = await response.json();
        showNotification(result.message, result.status);
        return result;
    } catch (error) {
        showNotification(`Error adding submodule: ${error.message}`, 'danger');
    }
}

async function updateSubmodules() {
    try {
        const response = await fetch('/api/git/submodule/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        showNotification(result.message, result.status);
        return result;
    } catch (error) {
        showNotification(`Error updating submodules: ${error.message}`, 'danger');
    }
}

// Math calculator functions
async function calculate(operation, a, b = null) {
    try {
        const response = await fetch('/api/math/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ operation, a, b })
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        showNotification(`Calculation error: ${error.message}`, 'danger');
    }
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
