var fs = require('fs');
var files = require('./process-files');

/**
 * Confirm the directory exists and process the zip files in the directory.
 * @param {string[]} args - command-line arguments (process.argv)
 * @param {function(int, string):void} callback - callback function to execute upon completion
 */
exports.process = function (args, callback) {
    args = args || process.argv;

    console.log();
    if (args.length <= 2) {
        var error = new Error("invalid command line arguments");
        error.errno = -1;
        return callback(error);
    }
    var path = args[2];

    fs.stat(path, function(err, stats) {
        if (err) {
            return callback(err);
        }
        if (stats === undefined || !stats.isDirectory()) {
            var error = new Error(path + " is an invalid path.");
            error.errno = -3;
            return callback(error);
        }
        console.log("unzipping files located in " + path + "...");
        fs.readdir(path, function(err, items) {
            files.process(path, items);
            return callback(null, "done.");
        });
    });
};