const path = require('path');
const express = require('express');
const stubUtils = require('./stub/stubUtils.js');
const STUB_REQUESTS = require('./stub/stubRequestList.js');

module.exports = {
    transpileDependencies: [
        'vuetify',
    ],
    devServer: {
        port: 8081,
        before(app) {
            app.use(express.json());
            app.all('/**', (req, res, next) => {
                // Stub 대상이면 /stub/api에 정의된 데이터로 Stubing 한다.
                if (stubUtils.isStubRequest(req, STUB_REQUESTS)) {
                    const stubPath = path.join(__dirname, 'stub/api', req.path);
                    console.log(stubPath);
                    const result = require(stubPath);
                    res.send(result[req.method.toLowerCase()](req));
                    return;
                }
                next();
            });
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
};
