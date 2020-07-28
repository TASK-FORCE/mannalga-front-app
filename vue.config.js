const path = require('path');
const express = require('express');
const stubUtils = require('./stub/stubUtils.js');
const NOT_STUB_REQUESTS = require('./stub/notStubRequestList.js');

module.exports = {
    transpileDependencies: [
        'vuetify',
    ],
    devServer: {
        port: 8081,
        before(app) {
            app.use(express.json());
            app.all('/api/**', (req, res, next) => {
                // Stub 대상이면 /stub/api에 정의된 데이터로 Stubing 한다.
                if (stubUtils.isStubRequest(req, NOT_STUB_REQUESTS)) {
                    const stubPath = path.join(__dirname, 'stub', req.path);
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
