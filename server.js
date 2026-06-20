const express = require('express');
const cors = require('cors');          // If you have CORS installed
const app = express();
const PORT = process.env.PORT || 4000;

// --- Middleware ---
app.use(express.json());               // Parse JSON bodies
app.use(cors());                       // Enable CORS (optional, but useful)

// --- Root Route (fixes "Cannot GET /") ---
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Enlightment1 Backend is live!',
        status: 'success',
        endpoints: {
            '/': 'Welcome message',
            '/api': 'Your API endpoints (if you have them)'
        }
    });
});

// --- Your Custom Routes ---
// If you have routes inside the 'routes' folder, import them like this:
// const apiRoutes = require('./routes/api');
// app.use('/api', apiRoutes);

// Example route (remove or replace)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// --- Catch-all 404 handler (optional) ---
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found', 
        message: `Route ${req.originalUrl} does not exist` 
    });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`ENLIGHT QConnect backend on port ${PORT}`);
});
