import RNFetchBlob from 'rn-fetch-blob'
import Api from '../api'

const WwwApiPath = Api.WwwApiPath

export function createLog(entry){
  entry = Object.assign(entry, {
    platform: Adapter.isIOS ? 'ios' : 'android',
    timestamp: new Date().getTime().toString(),
    uid: !!user && user.id ? user.id : ''
  })
  storage.load({
    key: 'log'
  }).then(ret => {
    let data = [].concat(ret)
    data.push(entry)
    storage.save({
      key: 'log',
      data: data
    }).catch(()=>{})
  }).catch(()=>{
    let data = []
    data.push(entry)
    storage.save({
      key: 'log',
      data: data
    }).catch(()=>{})
  })
}

/**
 * APP 打开时上传log
 *
 * @export
 */
export function initLogs(){
  storage.load({
    key: 'log'
  }).then(ret => {
    if(ret.length > 0){
      let last_one = ret[ret.length -1]
      if(last_one.type === 'statistics' && last_one.action === 'open'){
        abortedLog(ret)
      }else{
        uploadLogs(ret)
      }
    }
  }).catch(err => {
    _log(err)
    storage.save({
      key: 'log',
      data: []
    }).catch(()=>{})
  })
}

function uploadLogs(logs, filePath){
  _log(logs)
  fetchPro(`${WwwApiPath}/log_modules`, {
    method: 'post',
    body: JSON.stringify({logs: logs})
  }).then(resJson => {
    storage.remove({
      key: 'log'
    })
    if(filePath){
      RNFetchBlob.fs.unlink(filePath).catch(()=>{})
    }
  })
}

function abortedLog(ret){
  let last_one = ret[ret.length -1]
  let filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/temp_log.txt`
  RNFetchBlob.fs.readFile(filePath).then(res => {
    _log(res)
    let abort_log = Object.assign({}, last_one, {
      action: 'close',
      timestamp: res
    })
    ret.push(abort_log)
    uploadLogs(ret, filePath)
  }).catch(err => {
    _log(err)
    uploadLogs(ret)
  })
}