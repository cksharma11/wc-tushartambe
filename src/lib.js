const { parseInputs } = require("./parser");

const readFile = function (file, fs) {
    return fs.readFileSync(file, 'utf8');
}

const countBytes = function (text) {
    return text.length;
}

const isNotEmpty = function (character) {
    return character !== "";
}

const countWords = function (text) {
    let words = text.split(/[ \n]+/).filter(isNotEmpty);
    return words.length;
}

const countLines = function (text) {
    return text.split("\n").length - 1;
}

const isOptionExists = function(options, option) {
    let separatedOptions = options.join("").split("");
    return separatedOptions.includes(option);
}

const wc = function (args, fs) {
    let organizedInputs = parseInputs(args);
    const { files, options } = organizedInputs;
    const fileContents = readFile(files[0],fs);
    let wcOutput = [];
    
    let isOptionPresent = isOptionExists.bind(null, options);

    if(isOptionPresent('l')) {
        wcOutput.push(countLines(fileContents));
    }

    if(isOptionPresent('w')) {
        wcOutput.push(countWords(fileContents));
    }

    if(isOptionPresent('c')) {
        wcOutput.push(countBytes(fileContents));
    }

    wcOutput.push(files[0]);

    return wcOutput.join("\t"); 
}

module.exports = {
    wc
};
