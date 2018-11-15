"use strict";

const ServerConfig = require("ServerConfig.js");

let express = require("express");
let serviceHandler = express();
global.SERVICE_HANDLER = serviceHandler;

let compression = require("compression");
let bodyParser = require("body-parser");
let helmet = require("helmet");

let StartService = class {
    constructor() {
        this.init();
        this.startServices();
    }

    init() {
        serviceHandler.use(compression());
        serviceHandler.use(helmet());

        serviceHandler.use(express.static("./client/", { index: "index.html" }));

        serviceHandler.use(bodyParser.json());
        serviceHandler.use(bodyParser.urlencoded({ extended: true }));
    }

    startServices() {

        //Put your service here.
        //For example: serviceHandler.post("/Login/");
        //POST to "http://yourIP/Login/" will accept your request if valid.

        serviceHandler.listen(ServerConfig.PORT, () => {
            console.log("Server has started...");
        });
    }
}

exports.StartService = new StartService();