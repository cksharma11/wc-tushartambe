
const isOption = function (givenArg) {
  let validOptions = ['-l', '-c', '-w'];

  return validOptions.includes(givenArg);
}

createArgsObject = function (option, file) {
  return { "option": option, "file": file };
}

const givenOption = {
  "-l": "lines",
  "-c": "bytes",
  "-w": "words"
}

const parseInputs = function (args) {
  const firstArg = args[0];
  const secondArg = args[1];

  if (isOption(firstArg)) {
    return createArgsObject(givenOption[firstArg], secondArg);
  }

  return { option: "all", file: firstArg };
}

module.exports = {
  parseInputs
}