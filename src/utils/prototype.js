// eslint-disable-next-line no-extend-native,func-names
String.prototype.hashCode = function () {
    let hash = 0;
    if (this.length === 0) return hash;
    for (let i = 0; i < this.length; i++) {
        const char = this.charCodeAt(i);
        // eslint-disable-next-line no-bitwise
        hash = ((hash << 5) - hash) + char;
        // eslint-disable-next-line no-bitwise
        hash &= hash; // Convert to 32bit integer
    }
    return hash;
};
