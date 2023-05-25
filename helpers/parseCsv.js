const csvtojson = require('csvtojson');
const path = require('path');

function parseCsvToJson(filePath, header) {
  return new Promise((resolve, reject) => {
    const jsonArray = [];
    const csvFilePath = path.resolve(__dirname, filePath);
    csvtojson({
      headers: header
    })
      .fromFile(csvFilePath)
      .subscribe(
        (jsonObj) => jsonArray.push(jsonObj),
        reject,
        () => resolve(jsonArray)
      );
  });
}

module.exports = {
  parseCsvToJson
};