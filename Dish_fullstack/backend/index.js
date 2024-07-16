const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoutes')
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/dish',productRoute);

mongoose
    .connect('mongodb://localhost:27017/dishDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(5000, () => {
    console.log("Server Started on the port 5000");
});
