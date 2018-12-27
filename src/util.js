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

module.exports = {
  readFile,
  countBytes,
  countLines,
  countWords
}