const fs = require('fs');

function writeDataToFile(fileName, content) {
  fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (err) => {
    if (error) {
      console.log("ERROR writeDataToFile: ", error);
    }
  })
}

function getPostData(req) {
  return new Promise((resolve, reject) => {

    try {

      let body = '';
      req.on('data', chunk => {
      console.log("🚀 ~ file: utils.js ~ line 18 ~ returnnewPromise ~ chunk", chunk)
          body += chunk.toString();
      })

      req.on('end', () => {
        resolve(JSON.parse(body));
      });

    } catch (error) {

      reject(error);

    }

  })
}

module.exports = {
  writeDataToFile,
  getPostData,
}