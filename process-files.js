var statSync = require('fs').statSync;
var path = require('path');
var glob = require('glob');
var zip = require('./extract-file.js');

/**
 * Loop through all zip files in the directory and extract them
 * @param {string} directoryPath - full path to the directory of zip files
 * @param {string[]} files - array of file names in directoryPath
 */
exports.process = function (directoryPath, files) {

    for (var i = 0; i < files.length; i++) {
        var item = files[i];

        var filePath = path.join(directoryPath, item);
        var fileStats;
        try {
            fileStats = statSync(filePath);
        }
        catch (err) {
            //console.log("invalid file path", err);
            continue;
        }
        if (!fileStats.isFile()) {
            //console.log(item + " is not a file.");
            continue;
        }
        if (fileStats.size === 0) {
            //console.log(item + " is empty.");
            continue;
        }
        if (!item.endsWith(".zip")) {
            //console.log(item + " is not a zip file.");
            continue;
        }
        // check to see if this zip file has already been extracted
        var firstNine = item.substr(0, 9);
        var matchingFiles = glob.sync(path.join(directoryPath, firstNine + "*.xls"));
        if (matchingFiles.length > 0) {
            //console.log(matchingFiles[0] + " already exists.");
            continue;
        }
        console.log("extracting " + item + "...");
        zip.extractFile(filePath, directoryPath, firstNine);
    }
};
