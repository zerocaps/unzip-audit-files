var directory = require('../process-directory');
var fs = require('fs');
var os = require('os');

describe("ProcessDirectory test:", function() {
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
    it("confirm command line args were passed in properly", function(done) {
        directory.process(["node", __dirname], function(err) {
            expect(err.errno).toBe(-1);
            done();
        });
    });
    it("confirm path is valid", function(done) {
        directory.process(["node", __dirname, "invalid"], function(err) {
            var enoentCode = -2;
            if (os.type() === "Windows_NT") {
                enoentCode = -4058;
            }
            expect(err.errno).toBe(enoentCode);
            done();
        });
    });
    it("confirm path is a directory", function(done) {
        directory.process(["node", __dirname, testFile], function(err) {
            expect(err.errno).toBe(-3);
            done();
        });
    });
    it("confirm process files is called", function(done) {
        directory.process(["node", __dirname, emptyDir], function(err, msg) {
            expect(err).toBeNull();
            expect(msg).toBe("done.");
            done();
        });
    });
});
