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

const requiredOption = {
    "words": countWords,
    "bytes": countBytes,
    "lines": countLines
}

const wc = function (args, fs) {
    let organizedInputs = parseInputs(args);
    const { file, option } = organizedInputs;

    const fileContent = readFile(file, fs);

    if (args.length == 1) {
        const lineCount = countLines(fileContent);
        const byteCount = countBytes(fileContent);
        const wordCount = countWords(fileContent);
        return [lineCount, wordCount, byteCount, args].join("\t");
    }

    let count = requiredOption[option](fileContent);
    return [count, file].join("\t");
}

module.exports = {
    wc
};
