'use strict';

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 7000;


const myMiddleware = (req, res, next) => {
  console.log('Middleware executed!');
  next();
};

const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

const connection = require('./DBconnection');

app.set('view engine', 'ejs');
app.use(express.json());

app.use(myMiddleware); 

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);


http.createServer(app).listen(port, () => {
  console.log(`\x1b[42m\x1b[32m[SUCCESS]\x1b[0m Server is running on port ${port}`);
});
