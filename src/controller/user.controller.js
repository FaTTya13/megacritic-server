require('dotenv').config();
const jwt = require('jsonwebtoken');
// const User = require("../model/User");
// const UserRole = require("../model/UserRole");
// const UserSchema = require("../entity/UserSchema");
// const UserRoleSchema = require("../entity/UserRoleSchema");
// const dataSource = require("../../config");

class UserController {
    // async updateUserStatus(req,res) {
    //     const id = req.params.id
    //     const userstatus = req.body.userstatus
    //     const user = await db.query(`UPDATE person set userstatus = '${userstatus}' WHERE id = ${id} RETURNING *`)
    //     res.json(user.rows[0])
    // }
    async verifyToken(req, res, next) {
      // console.log(req, 'thiiiiss isi si icsaockoasc')
        const token = req.headers.authorization;
    
        if (!token || !token.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Unauthorized: Token not provided.' });
        }
    
        const jwtToken = token.split(' ')[1];
    
        try {
          // Verify and decode the token using the JWT_KEY from your environment
          const decoded = jwt.verify(jwtToken, process.env.JWT_KEY);
   
          // Assuming the decoded token has a property named 'id'
          const userId = decoded.id;

          return res.json(userId)
        } catch (err) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        }
      }

      async deleteUser(req,res) {

        // console.log(12312312412412412412312)
        const usersRepository = dataSource.getRepository(UserSchema);
        const user = await usersRepository.findOneBy({username: username})
        // const id = req.params.id
        // console.log(`id = ${id}`, userId)
        // const user = await db.query(`DELETE FROM person WHERE id = ${id}`)
        // res.json(user.rows[0])  
    }
}

module.exports = new UserController();