const fs = require("fs");

const writeFile = (path, data) => {
  fs.writeFileSync(path, data);
};

module.exports = { writeFile };
