var sliceArgs = require("./slicearguments");

module.exports = function(fn) {
    return function() {
        var args = sliceArgs(arguments);
        return new Promise(function(resolve, reject) {
            args.push(function(err) {
                if (err) {
                    return reject(err);
                }
                var results = sliceArgs(arguments, 1);
                if (results.length === 1) {
                    results = results[0];
                }
                return resolve(results);
            });
            fn.apply(null, args);
        });
    };
};
