const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

router.use("/", createProxyMiddleware ({
    target: 'http://localhost:5056',
    headers: {
        accept: "application/json, application/x-www-0form-urlencoded"
    },
    changeOrigin: true 


}))

module.exports = router;