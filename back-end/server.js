require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://reza-secureone.vercel.app"],
    credentials: true
})); // cors help us prevent any conflict when we make a request from front-end to the back-end.


// Routes
app.use("/api/v1/users", userRoute);

app.get('/', (req, res) => {
    res.send('Home Page');
});

// Error Middleware
app.use(errorHandler);

// --------------------------------------------------------------

// const port = process.env.PORT | 5000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully.');
        app.listen(5000, () => console.log('Server is listening on port 5000....'));
    } catch (error) {
        console.log(error.message);
    }
};

start().then(() => console.log("Done."));

// mongoose.connect(process.env.MONGO_URI).then(() => app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)})).catch(error => console.log(error));