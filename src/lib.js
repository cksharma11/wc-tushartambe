const { parseInputs } = require("./parser");
const { countBytes, countLines, countWords } = require("./util");

const isOptionExists = function(options, option) {
  return options.includes(option);
};

const joinWithTab = function(list) {
  return list.join("\t");
};

const joinWithNewLine = function(list) {
  return list.join("\n");
};

const calculateSum = function(firstList, secondList) {
  let sum = [];
  for (let counter = 0; counter < firstList.length - 1; counter++) {
    sum[counter] = firstList[counter] + secondList[counter];
  }
  sum.push("total");
  return sum;
};

const getCounts = function(options, fileName, fileContents) {
  let isOptionPresent = isOptionExists.bind(null, options);
  let wcOutput = [];

  if (isOptionPresent("l")) {
    wcOutput.push(countLines(fileContents));
  }
  if (isOptionPresent("w")) {
    wcOutput.push(countWords(fileContents));
  }

  if (isOptionPresent("c")) {
    wcOutput.push(countBytes(fileContents));
  }
  wcOutput.push(fileName);

  return wcOutput;
};
const sequenceGenerator = function(originalSequence, list) {
  let fileIndex = list[0].length - 1;
  let sequence = originalSequence.map(function(element) {
    for (let counter = 0; counter < originalSequence.length; counter++) {
      if (element == list[counter][fileIndex]) {
        return list[counter];
      }
    }
  });
  return sequence;
};

const reader = function(
  options,
  files,
  totalCounts,
  counter,
  fs,
  err,
  fileContents
) {
  totalCounts.push(getCounts(options, files[counter], fileContents));
  if (files.length == 1) {
    let wcOutput = joinWithNewLine(totalCounts.map(joinWithTab));
    console.log(wcOutput);
    fs.writeFileSync("./output", wcOutput, "utf8");
  }

  if (files.length > 1 && totalCounts.length == files.length) {
    let sequencedTotalCounts = sequenceGenerator(files, totalCounts);
    let total = sequencedTotalCounts.reduce(calculateSum);
    sequencedTotalCounts.push(total);
    let wcOutput = joinWithNewLine(sequencedTotalCounts.map(joinWithTab));
    console.log(wcOutput);

    fs.writeFileSync("./output", wcOutput, "utf8");
  }
};

const readFileContents = function(options, files, fs) {
  let totalCounts = [];
  let fileReader;
  for (let counter = 0; counter < files.length; counter++) {
    fileReader = reader.bind(null, options, files, totalCounts, counter, fs);
    fs.readFile(files[counter], "utf8", fileReader);
  }
};

const wc = function(args, fs) {
  let organizedInputs = parseInputs(args);

  const { files, options, errorMsg } = organizedInputs;

  if (errorMsg) {
    console.log(errorMsg);
  }
  readFileContents(options, files, fs);
};

module.exports = {
  wc
};
