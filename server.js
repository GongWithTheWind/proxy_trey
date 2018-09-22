require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const { routes } = require('./config.json');

app.use('/home/:id', express.static('public'));

for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address
        })
    );
}


app.listen(process.env.PORT, () => {
  console.log(`server running at: http://localhost:${process.env.PORT}`);
});
