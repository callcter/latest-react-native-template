const fs = require('fs')

const rs = fs.createReadStream('iconfont.txt')
rs.setEncoding('utf8')
rs.on('data', function(chunk){
  chunk = chunk.replace(/\n|\r|\t/g, '')
  // let reg = /.icon-[0-9|a-z|A-Z|-]+\:[\s\S]+\{[\s\S]+\"\\[0-9|a-z]+\"\;\}/g
  // let arr = chunk.match(reg)
  let arr = chunk.split('.i')
  arr.shift()
  let result = {}
  for(let i=0;i<arr.length;i++){
    let reg1 = /con-[0-9|a-z|A-Z|-]+\:/g
    let reg2 = /\"\\[0-9|a-z]+\"\;/g
    let str1 = arr[i].match(reg1)[0]
    let str2 = arr[i].match(reg2)[0]
    let str11 = str1.replace(/con-/, '').replace(/\:/, '')
    let str22 = str2.replace(/[\"]/, '').replace(/\\/, '').replace(/\"\;/, '')
    result[str11] = parseInt(str22, 16)
  }
  fs.writeFileSync('iconfont.json', JSON.stringify(result, null, 2), 'utf8')
})