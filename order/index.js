require('dotenv').config();
const express = require('express');
const app = express();

const config = require('./config/config_service');
const { createANewOrder } = require('./service/order.service');
const receiveFromOrderQueue = require('./amp/amp');

app.use(express.json());


const port = config.app.port;

receiveFromOrderQueue("order_queue");



app.listen(port, () => {
    console.log("====================================================")
    console.log(`🛒🛒🛒🛒🛒 ORDER => Server running on port ${port}`);
    console.log("=====================================================")
});