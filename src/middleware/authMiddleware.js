require('dotenv').config();
const jwt = require("jsonwebtoken");

const authMiddleware = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
    const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                    return res.status(400).json({message: `User not authorized`})
                }
                const decodedData = jwt.verify(token, process.env.JWT_KEY);
                req.user = decodedData;
                next();
            } catch(e) {
                    console.log(e)
                    return res.status(400).json({message: `User not authorized`})
                }
            console.log(req.headers)
}





module.exports = authMiddleware;