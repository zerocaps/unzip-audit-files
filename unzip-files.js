/**
 * Unzip all single-file archives in a given directory.
 * Assumes the zip archive only contains a single xls file.
 * @author derekWinfield
 * @example node unzip-files.js /Users/default/Documents/audit-logs
 */
var fs = require('fs');
var files = require('./process-files.js');

console.log();
if (process.argv.length <= 2) {
    console.log("Usage: node " + __filename + " path/to/folder");
    process.exit(-1);
}
var path = process.argv[2];

fs.stat(path, function(err, stats) {
    if (stats === undefined || !stats.isDirectory()) {
        console.log(path + " is an invalid path.");
        process.exit(-2);
    }
    console.log("unzipping files located in " + path + "...");
    fs.readdir(path, function(err, items) {
        files.process(path, items);
        console.log("done.");
        console.log();
    });
});
