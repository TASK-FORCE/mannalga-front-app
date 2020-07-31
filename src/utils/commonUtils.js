function isEmpty(target) {
    if (!target) {
        return true;
    }

    if (typeof target === 'string') {
        return target === '';
    }

    if (target instanceof Array) {
        return target.length === 0;
    }
    // isEmpty 기능을 추가하고 싶으면 추가한다.

    console.error(`isEmpty를 구현하지 않았습니다. target:${target}`);
    return false;
}

export {
    isEmpty,
};
