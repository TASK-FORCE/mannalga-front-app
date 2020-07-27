const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/',
        redirect: '/login',
    },
];

export default routes;
