const express = require('express');
const router = require('./router');
const fs = require('fs');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});