const express = require('express');
const router = express.Router();

const productController = {
  getAllProducts: (req, res) => {
    res.status(200).json({ 
      message: 'Get all products endpoint',
      data: [] 
    });
  },
  
  getProductById: (req, res) => {
    res.status(200).json({ 
      message: `Get product with ID: ${req.params.id}`,
      data: {} 
    });
  },
  
  createProduct: (req, res) => {
    res.status(201).json({ 
      message: 'Create product endpoint',
      data: req.body 
    });
  },
  
  updateProduct: (req, res) => {
    res.status(200).json({ 
      message: `Update product with ID: ${req.params.id}`,
      data: req.body 
    });
  },
  
  deleteProduct: (req, res) => {
    res.status(200).json({ 
      message: `Delete product with ID: ${req.params.id}` 
    });
  }
};

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
