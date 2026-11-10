const express = require('express');
const dotenv = require('dotenv');

// Load config
dotenv.config();

// Import middleware and routes
const requestLogger = require('./middleware/logger');
const productRoutes = require('./routes/products');

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

// Essential Middleware
app.use(express.json());
app.use(requestLogger);

// Mount product routes
app.use('/api/products', productRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        service: process.env.SERVICE_NAME
    });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(port, () => {
    console.log(`${process.env.SERVICE_NAME} running on http://localhost:${port}`);
});