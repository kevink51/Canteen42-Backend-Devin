const express = require('express');
const router = express.Router();

const orderController = {
  getAllOrders: (req, res) => {
    res.status(200).json({ 
      message: 'Get all orders endpoint',
      data: [] 
    });
  },
  
  getOrderById: (req, res) => {
    res.status(200).json({ 
      message: `Get order with ID: ${req.params.id}`,
      data: {} 
    });
  },
  
  createOrder: (req, res) => {
    res.status(201).json({ 
      message: 'Create order endpoint',
      data: req.body 
    });
  },
  
  updateOrder: (req, res) => {
    res.status(200).json({ 
      message: `Update order with ID: ${req.params.id}`,
      data: req.body 
    });
  },
  
  deleteOrder: (req, res) => {
    res.status(200).json({ 
      message: `Delete order with ID: ${req.params.id}` 
    });
  }
};

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
