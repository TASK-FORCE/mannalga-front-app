const NOT_STUB_REQUESTS = [
    {
        path: '/user',
        methods: [],
    },
];

module.exports = NOT_STUB_REQUESTS
    .map(request => ({
        path: `/api${request.path}`,
        methods: request.methods,
    }));
