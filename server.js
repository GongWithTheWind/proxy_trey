const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');
const { routes } = require('./config.json');

app.use('/home/:id', express.static('public'));

for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address
            // pathRewrite: (path, req) => {
            // 	console.log(route.address, path)
            // }
        })
    );
}


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
