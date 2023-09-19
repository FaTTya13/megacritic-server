const Router = require('express');
const router = new Router()
const userController = require('../controller/user.controller')

// router.put('/:id', userController.updateUserStatus)
// router.delete('/:id', userController.deleteUser)
      
// Protected route that requires authentication
router.post('/users', userController.verifyToken);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;