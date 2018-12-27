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

const hasLineCountOption = function(options) {
    let separatedOptions = options.join("").split("");
    return separatedOptions.includes('l');
}

const hasWordCountOption = function(options) {
    let separatedOptions = options.join("").split("");
    return separatedOptions.includes('w');
}

const hasByteCountOption = function(options) {
    let separatedOptions = options.join("").split("");
    return separatedOptions.includes('c');
}

const wc = function (args, fs) {
    let organizedInputs = parseInputs(args);
    const { files, options } = organizedInputs;
    const fileContents = readFile(files[0],fs);
    let wcOutput = [];
     
    if(hasLineCountOption(options)) {
        wcOutput.push(countLines(fileContents));
    }

    if(hasWordCountOption(options)) {
        wcOutput.push(countWords(fileContents));
    }

    if(hasByteCountOption(options)) {
        wcOutput.push(countBytes(fileContents));
    }
    wcOutput.push(files[0]);

    return wcOutput.join("\t"); 
}

module.exports = {
    wc
};
