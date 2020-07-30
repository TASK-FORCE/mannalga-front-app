function findNotStubMethod(notStubMethods, method) {
    // notStubMethods가 비어있으면 Stub 대상이 아닌것으로 판단한다.
    if (!notStubMethods || notStubMethods.length === 0) {
        return true;
    }
    return !!notStubMethods.find(notStubMethod => notStubMethod.toUpperCase() === method);
}

function isNotStubRequest({ path, method }, notStubRequests) {
    const notStubRequest = notStubRequests.find(value => value.path === path);
    return notStubRequest ? findNotStubMethod(notStubRequest.methods, method) : false;
}

module.exports = {
    isStubRequest(request, notStubRequests) {
        return !isNotStubRequest(request, notStubRequests);
    },
};
