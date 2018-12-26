const readFile = function(file, fs) {
    return fs.readFileSync(file,'utf8');
}

const countBytes = function (text) {
    return text.split("").length;
}

const replaceSpaceWithNewline = function(character) {
    if(character == " ") {
      return "\n";
    }
    return character;
}

const isNotEmpty = function(character) {
    return character !== "";
}

const countWords = function (text) {
    let textBytes = text.split("");
    let words = textBytes.map(replaceSpaceWithNewline).join("").split("\n").filter(isNotEmpty);
    return words.length;
}

const countLines = function(text) {
    return text.split("\n").length;
}

const wc = function(file, fs) {
    const fileContent = readFile(file, fs);

    const lineCount = countLines(fileContent)-1;
    const byteCount = countBytes(fileContent);
    const wordCount = countWords(fileContent);
    

    return [lineCount,wordCount,byteCount,file].join("\t");
}

module.exports = {
    wc
};
