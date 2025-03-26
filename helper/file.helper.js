const fs = require('node:fs');

const  readFromJsonFile=(FilePath)=>{
    const data = fs.readFileSync(FilePath, 'utf8');
    return JSON.parse(data);
}
const writeToJsonFile=(FilePath,data)=>{
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(FilePath, jsonData);
}
module.exports = {
    readFromJsonFile,
    writeToJsonFile
}