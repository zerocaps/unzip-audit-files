/**
 * Unzip all single-file archives in a given directory.
 * Assumes the zip archive only contains a single xls file.
 * @author derekWinfield
 * @example node unzip-files.js /Users/default/Documents/audit-logs
 */
var directory = require('./process-directory');

directory.process(process.argv, function (err, msg) {
    if (err) {
        console.log("Usage: node " + __filename + " path/to/folder");
        console.error(err);
        process.exit(err.errno);
    }
    console.log(msg);
    console.log();
});
