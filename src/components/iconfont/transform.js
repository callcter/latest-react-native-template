const fs = require('fs');

const rs = fs.createReadStream('iconfont.txt');
rs.setEncoding('utf8');
rs.on('data', (chunk) => {
  const chunkTemp = chunk.replace(/\n|\r|\t/g, '');
  const arr = chunkTemp.split('.i');
  arr.shift();
  const result = {};
  for (let i = 0; i < arr.length; i += 1) {
    const reg1 = /con-[0-9|a-z|A-Z|-]+:/g;
    const reg2 = /"\\[0-9|a-z]+";/g;
    const str1 = arr[i].match(reg1)[0];
    const str2 = arr[i].match(reg2)[0];
    const str11 = str1.replace(/con-/, '').replace(/:/, '');
    const str22 = str2.replace(/"/, '').replace(/\\/, '').replace(/";/, '');
    result[str11] = parseInt(str22, 16);
  }
  fs.writeFileSync('iconfont.json', JSON.stringify(result, null, 2), 'utf8');
});
