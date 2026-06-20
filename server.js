const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Root Route ---
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Enlightment1 Backend is live!',
        status: 'success',
        endpoints: {
            '/': 'Welcome message',
            '/health': 'Health check',
            '/api/*': 'Your API routes (auto-loaded from /routes folder)'
        }
    });
});

// --- Health Check ---
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// --- AUTO-LOAD ROUTES FROM /routes FOLDER ---
const routesPath = path.join(__dirname, 'routes');

if (fs.existsSync(routesPath)) {
    const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('.js'));
    
    routeFiles.forEach((file) => {
        const routeName = path.basename(file, '.js'); // e.g., 'users' from 'users.js'
        const routeModule = require(path.join(routesPath, file));
        
        // Mount the route at /api/[routeName]
        app.use(`/api/${routeName}`, routeModule);
        
        console.log(`✅ Loaded route: /api/${routeName}`);
    });
} else {
    console.log('⚠️ No routes folder found');
}

// --- Catch-all 404 ---
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} does not exist`
    });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 ENLIGHT QConnect backend on port ${PORT}`);
});
