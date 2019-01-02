const assert = require("assert");
const { parseInputs } = require("../src/parser.js");

describe("parseInputs", () => {
  describe("for only single files is given", () => {
    it('should return object with key "files" and  value filenames', () => {
      let actual = parseInputs(["file1"]);
      let expectedOutput = {
        options: ["l", "w", "c"],
        files: ["file1"],
        errorMsg: ""
      };
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe("for an options and a files is given", () => {
    it('should return object with key "files" and "options" for -c', () => {
      let actual = parseInputs(["-c", "file1"]);
      let expectedOutput = { options: ["c"], files: ["file1"], errorMsg: "" };
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return object with key "files" and "options" for -l', () => {
      let actual = parseInputs(["-l", "file1"]);
      let expectedOutput = { options: ["l"], files: ["file1"], errorMsg: "" };
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe("for multiples options are given", () => {
    it('should return object with key "files" and "options" and given options in it', () => {
      let actual = parseInputs(["-c", "-l", "file1"]);
      let expectedOutput = {
        options: ["c", "l"],
        files: ["file1"],
        errorMsg: ""
      };
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return object with key "files" and "options" ', () => {
      let actual = parseInputs(["-lc", "file1"]);
      let expectedOutput = {
        options: ["l", "c"],
        files: ["file1"],
        errorMsg: ""
      };
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe("for multiples options and multiple files are given", () => {
    it('should return object with key "files" and "options" and given options in it', () => {
      let actual = parseInputs(["-c", "-l", "file1", "file2", "file3"]);
      let expectedOutput = {
        options: ["c", "l"],
        files: ["file1", "file2", "file3"],
        errorMsg: ""
      };
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return object with key "files" and "options" ', () => {
      let actual = parseInputs(["-lcw", "file1", "file2", "anotherFile"]);
      let expectedOutput = {
        options: ["l", "c", "w"],
        files: ["file1", "file2", "anotherFile"],
        errorMsg: ""
      };
      assert.deepEqual(actual, expectedOutput);
    });
  });
  describe("for invalid option errors", () => {
    it('should return object with key "files" and "options"and errorMsg for invalid option', () => {
      let actual = parseInputs(["-c", "-x", "file1"]);
      errorMsg = "wc: illegal option -- " + "x";
      errorMsg += "\n" + "usage: wc [-clmw] [file ...]";
      let expectedOutput = {
        options: ["c", "x"],
        files: ["file1"],
        errorMsg: errorMsg
      };
      assert.deepEqual(actual, expectedOutput);
    });
  });
});
