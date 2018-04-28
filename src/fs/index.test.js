var walkDir = require('./index').walkDir;

walkDir(process.cwd()).then(function(files) {
    console.log('files', files);
}).catch(function(e) {
    console.log('error', e);
});