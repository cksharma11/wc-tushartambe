const filesStartFrom = function (args) {
  for (let counter = 0; counter < args.length; counter++) {
    if (args[counter][0] !== "-") {
      return counter;
    }
  }
  return args.length;
}

const separateOptions = function (options) {
  let optionsWithoutDash = options.map((option) => option.slice(1));
  let separatedOptions = optionsWithoutDash.join("").split("");

  return separatedOptions;
}

const isInValidOption = function (arg) {
  const validOptions = ['l', 'w', 'c'];
  return !validOptions.includes(arg);
}

const parseInputs = function (args) {
  const filesStartFromIndex = filesStartFrom(args);
  let errorMsg = "";
  let options = separateOptions(args.slice(0, filesStartFromIndex));
  const files = args.slice(filesStartFromIndex);

  if (options.length == 0) {
    options = ["l", "w", "c"];
  }

  let invalidOptionIndex = options.findIndex(isInValidOption);

  if (invalidOptionIndex != -1) {
    errorMsg = "wc: illegal option -- " + options[invalidOptionIndex];
    errorMsg += "\n" + "usage: wc [-clmw] [file ...]"
  }

  return {
    options, files, errorMsg
  };
}

module.exports = {
  parseInputs
}