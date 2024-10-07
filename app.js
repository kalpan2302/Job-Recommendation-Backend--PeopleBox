const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// API Routes
app.use('/api/recommendations', recommendationRoutes);

// Start server
const PORT = config.port || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
