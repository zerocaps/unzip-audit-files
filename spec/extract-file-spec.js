var zip = require('../extract-file');
var fs = require('fs');
var path = require('path');

var filePath = "spec/support";
var zipFile = "test.zip";
var extractedFile = "test.txt";
var prefix = "prefix";

function removeFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

describe("ExtractFile test:", function() {
    var realPath = path.join(filePath, prefix + extractedFile);

    beforeAll(function() {
        removeFile(realPath);
    });
    afterAll(function() {
        removeFile(realPath);
    });
    it("extracts a file to a folder", function() {
        zip.extractFile(path.join(filePath, zipFile), filePath, prefix);
        expect(fs.existsSync(realPath)).toBeTruthy();
    });
    it("throws Invalid filename", function() {
        expect(function () { zip.extractFile("x.zip", "", ""); }).toThrow();
    });
});