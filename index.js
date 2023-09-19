require('dotenv').config();
require('reflect-metadata');
const express = require('express');
const cors = require('cors');
const cookiePaser = require('cookie-parser')

const dataSource = require('./config')
const authRouter = require("./src/routes/auth.router");
const userRouter = require("./src/routes/user.routes");
const PORT = parseInt(process.env.PORT, 10) || 5000

const app = express();

app.use(cors())
app.use(express.json())
app.use("/", authRouter)
app.use('/', userRouter)

const start = () => {
    try {
        app.get("/", function(request, response){
            response.send("<h2>Hello World!</h2>");
        });
        app.listen(PORT, () => console.log(`started on ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start();