const assert = require('assert');
const { wc } = require('../src/lib');

const numbers = ["0","1","2","3","4","5","6","7","8","9"].join("\n");
const alphabets = ["a","b","c","d","e","f"].join("\n");
const line = "line";

const files = { "numbers":numbers, "alphabets":alphabets, "line":line };

const fs = {};
fs.readFileSync = function(file,encoding) {
    return files[file];
}
describe('wc',() => {
    it('should return total lines, words and characters for no option and a file is given',() => {
        let actual = wc("numbers",fs);
        let expectedOutput = ["10","10","19","numbers"].join("\t");
        assert.deepEqual(actual, expectedOutput);
    });

    it('should return total lines, words and characters for no option and a file is given',() => {
        let actual = wc("line",fs);
        let expectedOutput = ["1","1","4","line"].join("\t");
        assert.deepEqual(actual, expectedOutput);
    });
});