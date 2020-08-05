function findStubMethod(stubMethods, actualMethod) {
    // stubMethods가 비어있으면 Stub 대상으로 판단
    if (!stubMethods || stubMethods.length === 0) {
        return true;
    }
    return !!stubMethods.find(stubMethod => stubMethod.toUpperCase() === actualMethod);
}

function isStubRequest({ path, method }, stubRequests) {
    const stubRequest = stubRequests.find(value => value.path === path);
    return stubRequest ? findStubMethod(stubRequest.methods, method) : false;
}

module.exports = {
    isStubRequest(request, stubRequests) {
        return isStubRequest(request, stubRequests);
    },
};
