const Router = require('express');
const router = new Router()
const authController = require("../controller/auth.controller");
const {check} = require("express-validator");
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/users', roleMiddleware('admin'), authController.getUsers)
router.post('/signup', [
    check( 'username', `Username can't be empty`).notEmpty(),
    check( 'password', `Password must contain at least 8 characters and max 16 characters`).isLength({min:8,max:16}),
], authController.signUp)
router.post('/signin', authController.signIn)


module.exports = router;