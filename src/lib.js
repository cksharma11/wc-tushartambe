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

const isOptionExists = function (options, option) {
    let separatedOptions = options.join("").split("");
    return separatedOptions.includes(option);
}

const resultGenerator = function (fs, options, file) {

    const fileContents = readFile(file, fs);
    let isOptionPresent = isOptionExists.bind(null, options);
    let wcOutput = [];

    if (isOptionPresent('l')) {
        wcOutput.push(countLines(fileContents));
    }

    if (isOptionPresent('w')) {
        wcOutput.push(countWords(fileContents));
    }

    if (isOptionPresent('c')) {
        wcOutput.push(countBytes(fileContents));
    }

    wcOutput.push(file);
    return wcOutput;
}

const joinWithTab = function (list) {
    return list.join("\t");
}

const joinWithNewLine = function (list) {
    return list.join("\n");
}

const calculateSum = function (firstList, secondList) {
    let sum = [];
    for (let counter = 0; counter < firstList.length - 1; counter++) {
        sum[counter] = firstList[counter] + secondList[counter];
    }
    sum.push("total");
    return sum;
}

const wc = function (args, fs) {
    let organizedInputs = parseInputs(args);
    const { files, options } = organizedInputs;
    let getResult = resultGenerator.bind(null, fs, options);
    let wcOutput = files.map(getResult);

    if (files.length > 1) {
        let total = wcOutput.reduce(calculateSum);
        wcOutput.push(total);
    }

    return joinWithNewLine(wcOutput.map(joinWithTab));
}

module.exports = {
    wc
};
