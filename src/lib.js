const { parseInputs } = require("./parser");

const readFile = function (file, fs) {
    return fs.readFileSync(file, 'utf8');
}

const countBytes = function (text) {
    return text.split("").length;
}

const replaceSpaceWithNewline = function (character) {
    if (character == " ") {
        return "\n";
    }
    return character;
}

const isNotEmpty = function (character) {
    return character !== "";
}

const countWords = function (text) {
    let textBytes = text.split("");
    let words = textBytes.map(replaceSpaceWithNewline).join("").split("\n").filter(isNotEmpty);
    return words.length;
}

const countLines = function (text) {
    return text.split("\n").length - 1;
}

const allCounts = function(text) {
  const lineCount = countLines(text);
  const byteCount = countBytes(text);
  const wordCount = countWords(text);
 
  return [lineCount, wordCount, byteCount ];
}

const requiredOption = {
    "words": countWords,
    "bytes": countBytes,
    "lines": countLines,
    "all" : allCounts
}

const wc = function (args, fs) {
    let organizedInputs = parseInputs(args);
    const { file, option } = organizedInputs;

    const fileContent = readFile(file, fs);

    if (args.length == 1) {
      let allCount = allCounts(fileContent);
      allCount.push(file); 
      return allCount.join("\t");
    }

    let count = requiredOption[option](fileContent);
    return [count, file].join("\t");
}

module.exports = {
    wc
};
