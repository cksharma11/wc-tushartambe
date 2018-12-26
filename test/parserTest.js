const assert = require('assert');
const { parseInputs } = require('../src/parser.js');

describe('parseInputs', () => {
  describe('for only single file is given', () => {
    it('should return object with key "file" and  value filename', () => {
      let actual = parseInputs(["file1"]);
      let expectedOutput = { file: "file1" };
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for an option and a file is given', () => {
    it('should return object with key "file" and "option" for -c', () => {
      let actual = parseInputs(["-c","file1"]);
      let expectedOutput = { file: "file1", "option": "bytes" };
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return object with key "file" and "option" for -l', () => {
      let actual = parseInputs(["-l","file1"]);
      let expectedOutput = { file: "file1", "option": "lines" };
      assert.deepEqual(actual, expectedOutput);
    });
  });

});