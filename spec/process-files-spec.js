var files = require('../process-files');
var zip = require('../extract-file');

describe("ProcessFiles test", function() {
    var testDir = "spec/support";
    var nonExistentFile = "no-file.zip";
    var zeroByteFile = "zero-byte-file.zip";
    var xlsFile = "not-a-real-xls-file.xls";
    var zipFile = "not-a-real-zip-file.zip";
    var realZipFile = "test.zip";

    beforeAll(function() {
        spyOn(files, 'process').and.callThrough();
        spyOn(zip, 'extractFile');
    });
    it("tests the process function", function() {
        files.process("", []);
        expect(files.process).toHaveBeenCalled();
        expect(zip.extractFile).not.toHaveBeenCalled();
    });
    it("confirms the filepath exists", function() {
        files.process(testDir, [nonExistentFile]);
        expect(files.process).toHaveBeenCalled();
        expect(zip.extractFile).not.toHaveBeenCalled();
    });
    it("confirms the filepath points to a file", function() {
        files.process(testDir, [""]);
        expect(files.process).toHaveBeenCalled();
        expect(zip.extractFile).not.toHaveBeenCalled();
    });
    it("confirms the file size is greater than 0", function() {
        files.process(testDir, [zeroByteFile]);
        expect(files.process).toHaveBeenCalled();
        expect(zip.extractFile).not.toHaveBeenCalled();
    });
    it("confirms the filename ends with '.zip'", function() {
        files.process(testDir, [xlsFile]);
        expect(files.process).toHaveBeenCalled();
        expect(zip.extractFile).not.toHaveBeenCalled();
    });
    it("confirms the file to be extracted doesn't already exist", function() {
        files.process(testDir, [zipFile]);
        expect(files.process).toHaveBeenCalled();
        expect(zip.extractFile).not.toHaveBeenCalled();
    });
    it("confirms extractFile is called when the above conditions are met", function() {
        files.process(testDir, [realZipFile]);
        expect(files.process).toHaveBeenCalled();
        expect(zip.extractFile).toHaveBeenCalled();
    });
});
