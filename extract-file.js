var admZip = require('adm-zip');
var fs = require('fs');
var path = require('path');

/**
 * Extract a file from a zip archive
 * @param {string} filePath - full path to the zip file
 * @param {string} extractToPath - directory where the extracted file should be saved
 * @param {string} renamePrefix - string to prepend to the extracted filename
 */
exports.extractFile = function (filePath, extractToPath, renamePrefix) {
    var zip = new admZip(filePath);
    zip.extractAllTo(extractToPath);
    var filesInZip = zip.getEntries();
    var extractedFile = filesInZip[0];

    // rename the file using the renamePrefix
    var newFileName = path.join(extractToPath, renamePrefix + extractedFile.entryName);
    fs.renameSync(path.join(extractToPath, extractedFile.entryName), newFileName);

    // set the file timestamp to the time of the file in the archive
    var originalFileTime = extractedFile.header["time"];
    fs.utimesSync(newFileName, originalFileTime, originalFileTime);
};
