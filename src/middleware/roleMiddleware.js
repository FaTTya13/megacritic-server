require('dotenv').config();
const jwt = require("jsonwebtoken");

const roleMiddleware = function(role) {
    return function (req, res, next) {

    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                    return res.status(400).json({message: `User not authorized`})
                }
                const {role: userRole} = jwt.verify(token, process.env.JWT_KEY)
                console.log(userRole)
                let hasRole = false;
                if (role === userRole) {
                    hasRole = true;
                }
                if (!hasRole) {
                    return res.status(400).json({message: `You dont have permission`})
                }
                next();
            } catch(e) {
                    console.log(e)
                    return res.status(400).json({message: `User not authorized`})
                }
    }
}


module.exports = roleMiddleware;