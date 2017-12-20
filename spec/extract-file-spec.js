var zip = require('../extract-file');
var fs = require('fs');
var path = require('path');

var filePath = "spec/support";
var zipFile = "test.zip";
var extractedFile = "test.txt";
var prefix = "prefix";

describe("extractFile Test", function() {
    beforeEach(function() {
        var realPath = path.join(filePath, prefix + extractedFile);
        if (fs.existsSync(realPath)) {
            fs.unlinkSync(path.join(filePath, prefix + extractedFile));
        }
    });
    it("extracts a file to a folder", function() {
        zip.extractFile(path.join(filePath, zipFile), filePath, prefix);
        expect(fs.existsSync(path.join(filePath, prefix + extractedFile))).toBeTruthy();
    });
    it("throws Invalid filename", function() {
        expect(function () { zip.extractFile("x.zip", "", ""); }).toThrow();
    });
});
