require('dotenv').config();
const User = require("../model/User");
const UserRole = require("../model/UserRole");
const UserSchema = require("../entity/UserSchema");
const UserRoleSchema = require("../entity/UserRoleSchema");
const dataSource = require("../../config");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');


const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role
  }
  return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '24h'})
}

class authController {
  async getUsers(req, res) {
    try {
    const usersRepository = dataSource.getRepository(UserSchema);
    const usersList = await usersRepository.find();
    res.json(usersList);
    } catch(e) {
        console.log(e)
        res.status(400).json({message: `Registration error`})
    }
    // const userRole = new UserRole();
    // const adminRole = new UserRole();
    
    // userRole.role = "user";
    // adminRole.role = "admin";

    // const userRolesRepository = dataSource.getRepository(UserRoleSchema);
    // await userRolesRepository.save(userRole);
    // await userRolesRepository.save(adminRole);
    // const userRolesList = await userRolesRepository.find(userRole);
    // console.log(userRolesList);
  }
  async signUp(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({message: `Registration error`, validationErrors})
      }
        const {username, password, email} = req.body;
        // console.log(req.body)
        const usersRepository = dataSource.getRepository(UserSchema);
        // const userRolesList = await usersRepository.find();
        const usernameCheck = await usersRepository.findOneBy({username: username})
        const emailCheck = await usersRepository.findOneBy({email: email})
        // console.log(usernameCheck, emailCheck)
        if (usernameCheck) {
            return res.status(400).json({message: `A user with that username already exists.`})
        }
        if (emailCheck) {
            return res.status(400).json({message: `A user with that email already exists.`})
        }
        const hashedPassword = bcrypt.hashSync(password, 6);
        // const userRolesRepository = dataSource.getRepository(UserRoleSchema);
        // const userRole = await userRolesRepository.findOneBy({role : "user"})
        const user = new User()
        user.id = uuidv4();
        user.username = username;
        user.password = hashedPassword;
        user.email = email;
        user.registryDate = new Date();
        user.lastLoginDate = '';
        user.role = 'user';

        // console.log(user)
        await usersRepository.save(user);
        return res.json({message: `User was successfully created!`})
    } catch(e) {
        console.log(e)
        res.status(400).json({message: `Registration error`})
    }
  }
  async signIn(req, res) {
    try {
      const {username, password} = req.body;
      const usersRepository = dataSource.getRepository(UserSchema);
      const user = await usersRepository.findOneBy({username: username})
      console.log(user)
      if (!user) {
        return res.status(400).json({message: `Username does not exist`})
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({message: `Invalid password`})
      }
      user.lastLoginDate = new Date();
      await usersRepository.save(user);

      const jwtToken = generateAccessToken(user.id, user.role)
      return res.json({jwtToken})

    } catch(e) {
        console.log(e)
        res.status(400).json({message: `Login error`})
    }
  }
}

module.exports = new authController();