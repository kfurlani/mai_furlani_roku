const express = require('express');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');

// By default, you can't access websites or their internal contents of you're not part of that site (have the same origin). This is the default behaviour for the Web - web spaces are like locked-down buidings. you need special access to retreve/use apis, services etc. The https-proxy-middleware library is like a swipe card tha gives you that access with a bit of configuration - it tells the thidd part to allow you to reieve daa, use its sevrces ect.

router.use('/', createProxyMiddleware({
    target: 'http://localhost:5050',
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}))

module.exports = router;