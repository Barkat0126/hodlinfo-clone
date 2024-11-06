const express = require('express');
const connectDB = require('./config/db');
const cryptoRoutes = require('./routes/crypto');
const path = require('path');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/crypto', cryptoRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
