const { wc } = require("./src/lib");
const fs = require("fs");

const main = function() {
  const args = process.argv.slice(2);

  wc(args, fs);
};
main();
