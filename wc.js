const { wc } = require('./src/lib');
const fs = require('fs');

const main = function() {
  const file = process.argv.slice(2);

  console.log(wc(file[0],fs));
}
main();
