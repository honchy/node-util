module.exports = function flattern(arr) {
    return arr.reduce(function(ret, item) {
        ret = ret.concat(Array.isArray(item) ? flattern(item) : item);
        return ret;
    }, []);
};