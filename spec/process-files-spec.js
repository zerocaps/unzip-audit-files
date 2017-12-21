var files = require('../process-files');

describe("ProcessFiles test", function() {
    beforeAll(function() {
        spyOn(files, 'process').and.callThrough();
    });
    it("tests the process function", function() {
        files.process("", []);
        expect(files.process).toHaveBeenCalled();
    });
});
