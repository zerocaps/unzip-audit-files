var directory = require('../process-directory');
var fs = require('fs');

describe("ProcessDirectory test", function() {
    var testDir = "spec/support";
    var testFile = testDir + "/test.zip";
    var emptyDir = testDir + "/empty";

    beforeAll(function() {
        if (!fs.existsSync(emptyDir)) {
            fs.mkdirSync(emptyDir);
        }
    });
    afterAll(function() {
        if (fs.existsSync(emptyDir)) {
            fs.rmdirSync(emptyDir);
        }
    });
    it("confirm command line args were passed in properly", function() {
        directory.process(["node", __dirname], function(err) {
            expect(err.errno).toBe(-1);
        });
    });
    it("confirm path is valid", function() {
        directory.process(["node", __dirname, "invalid"], function(err) {
            expect(err.errno).toBe(-2);
        });
    });
    it("confirm path is a directory", function() {
        directory.process(["node", __dirname, testFile], function(err) {
            expect(err.errno).toBe(-3);
        });
    });
    it("confirm process files is called", function() {
        directory.process(["node", __dirname, emptyDir], function(err, msg) {
            expect(err).toBeNull();
            expect(msg).toBe("done.");
        });
    });
});
