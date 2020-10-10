function createRenderComponent(component, data) {
    return {
        render(createElement) {
            return createElement(component, data);
        },
    };
}

export {
    createRenderComponent,
};
