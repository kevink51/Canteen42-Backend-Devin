const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testPgConnection, connectMongoDB, inMemoryStore } = require('./config/db');
const { initializeFirebase } = require('./config/firebase');
const ProductModel = require('./models/productModel');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const { verifyToken, isAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CANTEEN42 API' });
});

app.use('/api/products', productRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/orders', verifyToken, orderRoutes);
app.use('/api/admin', verifyToken, isAdmin, adminRoutes);

app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  res.status(200).json({ received: true });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const startServer = async () => {
  try {
    const pgConnected = await testPgConnection();
    if (!pgConnected) {
      console.log('PostgreSQL not connected. Using in-memory store for development.');
    } else {
      await ProductModel.initTable();
    }
    
    await connectMongoDB();
    
    initializeFirebase();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.log('Continuing in development mode despite errors');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} in fallback mode`);
        console.log(`API available at http://localhost:${PORT}`);
      });
    }
  }
};

startServer();

module.exports = app; // Export for testing
