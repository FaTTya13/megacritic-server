const express = require('express');
const PORT = process.env.PORT || 5000

const app = express();

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