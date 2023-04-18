require('dotenv').config();
const express = require('express');
const app = express();

const userRoutes = require('./routes/user.routes');
const config = require('./config/config_service');

app.use(express.json());

app.use('/user', userRoutes);

const port = config.app.port;
app.listen(port, () => {
    console.log("*****************************************************")
    console.log(`👨‍👩‍👦 USER => Server running on port ${port}`);
    console.log("*****************************************************")
});

