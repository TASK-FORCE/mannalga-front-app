const combineWithModuleName = (moduleName, name) => `${moduleName}/${name}`;

const extractResponseData = (response) => response && response.data && response.data.data;

export { combineWithModuleName, extractResponseData };
