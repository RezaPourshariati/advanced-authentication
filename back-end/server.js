require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000/", "https://authreza-app.vercel.app/"],
    credentials: true
})); // cors help us prevent any conflict when we make a request from front-end to the back-end.


app.get('/', (req, res) => {
    res.send('Home Page');
});

// --------------------------------------------------------------

// const port = process.env.PORT | 5000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully.');
        app.listen(5000, () => console.log('Server is listening on port 3000....'));
    } catch (error) {
        console.log(error);
    }
};

start().then(r => console.log(r));

// mongoose.connect(process.env.MONGO_URI).then(() => app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)})).catch(error => console.log(error));