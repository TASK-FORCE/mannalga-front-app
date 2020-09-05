const path = require('path');
const express = require('express');
const axios = require('axios');
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
            app.all('/**', async (req, res, next) => {
                // Stub 대상이면 /stub/api에 정의된 데이터로 Stubing 한다.
                if (stubUtils.isStubRequest(req, STUB_REQUESTS)) {
                    await new Promise(r => setTimeout(r, 500));
                    const stubPath = path.join(__dirname, 'stub', req.path);
                    const result = require(stubPath);
                    res.send(result[req.method.toLowerCase()](req));
                    return;
                }

                if (req.path.startsWith('/api')) {
                    const requestOption = {
                        url: process.env.VUE_APP_SERVER_URL + req.path,
                        method: req.method,
                        headers: req.headers,
                        data: req.body,
                    };
                    const result = await axios.request(requestOption);
                    res.status(result.status)
                        .send(result.data);
                    return;
                }

                next();
            });
        },
        proxy: {
            '/api': {
                target: process.env.VUE_APP_SERVER_URL,
                changeOrigin: true,
            },
        },
    },
};
