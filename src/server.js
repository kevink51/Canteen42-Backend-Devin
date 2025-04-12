const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testPgConnection, connectMongoDB, inMemoryStore } = require('./config/db');
const ProductModel = require('./models/productModel');
const { initializeFirebase } = require('./config/firebase');

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
    
    if (!pgConnected && inMemoryStore.products.length === 0) {
      inMemoryStore.products = [
        {
          id: '1',
          title: 'Sample Product 1',
          description: 'This is a sample product for development',
          price: 19.99,
          variants: [
            { name: 'Small', sku: 'SP1-S' },
            { name: 'Medium', sku: 'SP1-M' },
            { name: 'Large', sku: 'SP1-L' }
          ],
          stock: 100,
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '2',
          title: 'Sample Product 2',
          description: 'Another sample product for testing',
          price: 29.99,
          variants: [
            { name: 'Black', sku: 'SP2-B' },
            { name: 'White', sku: 'SP2-W' }
          ],
          stock: 50,
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        }
      ];
      console.log('Added sample products to in-memory store');
    }
    
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
