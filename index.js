const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// Tell the bodyparser middleware to accept more data
app.use(express.json({limit: '50mb'}));

//Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Body parser, reading data from body into req.body
app.use(express.json({limit: '50mb'}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Import Routes
const derRoute = require("./routes/derRoute");
const sicroRoute = require("./routes/sicroRoute");
const budgetRoute = require("./routes/budgetRoute");
const userRouter = require('./routes/userRoute');
const authRouter = require("./routes/authRoute");

//Connect to DB
dotenv.config({ path: "./config.env" });

mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("DB connection successful!"));

//Route Middlewares  
app.use("/v1/der",  derRoute);
app.use("/v1/sicro",  sicroRoute);
app.use("/v1/budget",  budgetRoute);
app.use("/v1/user", userRouter);
app.use("/v1/auth", authRouter);

//Start server
const port = 8000;
app.listen(process.env.PORT || port, () =>
    console.log(`Running on port ${port}`)
);

