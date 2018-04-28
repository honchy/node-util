var fs = require("fs");
var path = require("path");

var callbackPromise = require("../util/promisecallback");
var flattern = require("../util/flattern");

exports.walkDir = function getDirAllFiles(dir) {
    if (!dir) {
        return Promise.resolve([]);
    }

    return callbackPromise(fs.readdir)(dir)
        .then(function(files) {
            // promise 嵌套，好可怕，赶紧加个Promise.all
            return Promise.all(files.map(function(fileName) {
                var filePath = path.join(dir, fileName);
                return callbackPromise(fs.stat)(filePath).then(function(statInfo) {
                    if (statInfo.isFile()) {
                        return filePath;
                    } else if (statInfo.isDirectory()) {
                        return getDirAllFiles(filePath);
                    }
                });
            }));
        })
        .then(function(filePromises) {
            return flattern(filePromises);
        })
        .catch(function(e) {
            console.log("walk dir error", e);
        });
};
