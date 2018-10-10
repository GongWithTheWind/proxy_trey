const nr = require('newrelic');
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const { routes } = require('./config.json');
const port = process.env.PORT || 3000;

app.use('/home/:id', express.static('public'));

for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address
        })
    );
}


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
