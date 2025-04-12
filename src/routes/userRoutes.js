const express = require('express');
const router = express.Router();

const userController = {
  getAllUsers: (req, res) => {
    res.status(200).json({ 
      message: 'Get all users endpoint',
      data: [] 
    });
  },
  
  getUserById: (req, res) => {
    res.status(200).json({ 
      message: `Get user with ID: ${req.params.id}`,
      data: {} 
    });
  },
  
  createUser: (req, res) => {
    res.status(201).json({ 
      message: 'Create user endpoint',
      data: req.body 
    });
  },
  
  updateUser: (req, res) => {
    res.status(200).json({ 
      message: `Update user with ID: ${req.params.id}`,
      data: req.body 
    });
  },
  
  deleteUser: (req, res) => {
    res.status(200).json({ 
      message: `Delete user with ID: ${req.params.id}` 
    });
  }
};

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
