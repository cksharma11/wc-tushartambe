const assert = require('assert');
const { wc } = require('../src/lib');

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].join("\n");
const alphabets = ["a", "b", "c", "d", "e", "f"].join("\n");
const line = "line";

const files = { "numbers": numbers, "alphabets": alphabets, "line": line };

const fs = {};

fs.readFileSync = function (file, encoding) {
    return files[file];
}

describe('wc', () => {
    describe('for default case of no option and single file ', () => {
        it('should return total lines, words and characters for file with multiple lines', () => {
            let actual = wc(["numbers"], fs);
            let expectedOutput = ["9", "10", "19", "numbers"].join("\t");
            assert.deepEqual(actual, expectedOutput);
        });

        it('should return total lines, words and characters for file of only one line', () => {
            let actual = wc(["line"], fs);
            let expectedOutput = ["0", "1", "4", "line"].join("\t");
            assert.deepEqual(actual, expectedOutput);
        });
    });

    describe('for one option and single file ', () => {
        it("should return total lines for option '-l' for file", () => {
            let actual = wc(["-l", "numbers"], fs);
            let expectedOutput = ["9", "numbers"].join("\t");
            assert.deepEqual(actual, expectedOutput);
        });

        it('should return total characters for option "-c" of file', () => {
            let actual = wc(["-c", "line"], fs);
            let expectedOutput = ["4", "line"].join("\t");
            assert.deepEqual(actual, expectedOutput);
        });

        it('should return total words for option "-w" of file', () => {
            let actual = wc(["-w", "alphabets"], fs);
            let expectedOutput = ["6", "alphabets"].join("\t");
            assert.deepEqual(actual, expectedOutput);
        });
    });

    describe('for multiple options and single file ', () => {
        it("should return total lines and bytes for option '-lc' for file", () => {
            let actual = wc(["-lc", "numbers"], fs);
            let expectedOutput = ["9", "19", "numbers"].join("\t");
            assert.deepEqual(actual, expectedOutput);
        });

        it('should return all counts for option "-c", "-l", "-w" of file', () => {
            let actual = wc(["-c", "-wl", "alphabets"], fs);
            let expectedOutput = ["5", "6", "11", "alphabets"].join("\t");
            assert.deepEqual(actual, expectedOutput);
        });

        it('should return total words and bytes for option "-w" and "-c" is given', () => {
            let actual = wc(["-w", "-c", "alphabets"], fs);
            let expectedOutput = ["6", "11","alphabets"].join("\t");
            assert.deepEqual(actual, expectedOutput);
        });
    });
});