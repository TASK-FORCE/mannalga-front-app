import { ModuleTree } from 'vuex';

function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

function getModuleName(fileName) {
    return fileName
        .replace(/^\.\//, '')
        .replace(/\.\w+$/, '');
}

const tsModules = new Set(['common', 'club', 'clubList']);

function makeModules(): ModuleTree<any> {
    const modules: ModuleTree<any> = {};
    const requireModule = require.context(
        '.',
        true,
        /^((?!index|init).)*\.[jt]s$/,
    );
    requireModule.keys()
        .forEach(fileName => {
            const definitions = requireModule(fileName).default || requireModule(fileName);
            if (!definitions || !isObject(definitions)) {
                if (process.env.NODE_ENV === 'test') {
                    return;
                }
                console.error(`[vuex module] export default가 정의되지 않았거나 Object타입이 아닙니다. fileName: ${fileName}, definition: ${definitions}`);
                return;
            }

            const moduleName = getModuleName(fileName);
            modules[moduleName] = {
                namespaced: !tsModules.has(moduleName),
                ...definitions,
            };
        });
    return modules;
}

const modules = makeModules();
export default modules;
