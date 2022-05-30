const routes = require('./router')
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const express = require('express')
const logger = morgan("tiny");



module.exports = function(app){
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(logger);
    routes(app)
    return app
}