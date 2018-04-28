var _slice = Array.prototype.slice;
module.exports = function(args, start) {
    return _slice.call(args, start || 0);
};
