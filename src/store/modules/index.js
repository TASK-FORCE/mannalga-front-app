function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

function getModuleName(fileName) {
    return fileName
        .replace(/^\.\//, '')
        .replace(/\.\w+$/, '');
}

const expectedKeySet = new Set(['state', 'getters', 'mutations', 'actions']);

function makeModules() {
    const modules = {};
    const requireModule = require.context(
        '.',
        true,
        /^((?!index|template).)*\.js$/,
    );
    requireModule.keys()
        .forEach(fileName => {
            const definitions = requireModule(fileName).default;
            if (!definitions || !isObject(definitions)) {
                if (process.env.NODE_ENV === 'test') {
                    return;
                }
                console.error(`[vuex module] export default가 정의되지 않았거나 Object타입이 아닙니다. fileName: ${fileName}, definition: ${definitions}`);
                return;
            }

            const unExpectedKeys = Object.keys(definitions)
                .filter(key => !expectedKeySet.has(key));
            if (unExpectedKeys && unExpectedKeys.length > 0) {
                console.error(`[vuex module] definitions의 key가 올바르지 않습니다. keys: ${unExpectedKeys}`);
                return;
            }

            const moduleName = getModuleName(fileName);
            modules[moduleName] = {
                namespaced: true,
                ...definitions,
            };
        });
    return modules;
}

const modules = makeModules();

export default modules;
