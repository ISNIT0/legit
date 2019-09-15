const express = require('express');
const axios = require('axios');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.get('/', (req, res) => {
    const queryUrl = `https://glitched.news/api/article-metadata?url=${encodeURIComponent(req.query.url)}`;
    axios.get(queryUrl).then(resp => {
        res.send(resp.data);
    }).catch(err => res.send(err));
});

app.listen(1337, () => {
    console.info(`Listening on [1337]`);
});