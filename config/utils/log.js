import RNFetchBlob from 'rn-fetch-blob';
import Api from '../api';

const { WwwApiPath } = Api;

function uploadLogs(logs, filePath) {
  _log(logs);
  _fetch(`${WwwApiPath}/log_modules`, {
    method: 'post',
    body: JSON.stringify({ logs }),
  }).then(() => {
    storage.remove({
      key: 'log',
    });
    if (filePath) {
      RNFetchBlob.fs.unlink(filePath).catch(() => {});
    }
  });
}

function abortedLog(ret) {
  const lastOne = ret[ret.length - 1];
  const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/temp_log.txt`;
  RNFetchBlob.fs.readFile(filePath).then((res) => {
    _log(res);
    const abortLog = {
      ...lastOne,
      action: 'close',
      timestamp: res,
    };
    ret.push(abortLog);
    uploadLogs(ret, filePath);
  }).catch((err) => {
    _log(err);
    uploadLogs(ret);
  });
}

export function createLog(entry) {
  const entryTemp = Object.assign(entry, {
    platform: Adapter.isIOS ? 'ios' : 'android',
    timestamp: new Date().getTime().toString(),
    uid: !!user && user.id ? user.id : '',
  });
  storage.load({
    key: 'log',
  }).then((ret) => {
    const data = [].concat(ret);
    data.push(entryTemp);
    storage.save({
      key: 'log',
      data,
    }).catch(() => {});
  }).catch(() => {
    const data = [];
    data.push(entryTemp);
    storage.save({
      key: 'log',
      data,
    }).catch(() => {});
  });
}

/**
 * APP 打开时上传log
 *
 * @export
 */
export function initLogs() {
  storage.load({
    key: 'log',
  }).then((ret) => {
    if (ret.length > 0) {
      const lastOne = ret[ret.length - 1];
      if (lastOne.type === 'statistics' && lastOne.action === 'open') {
        abortedLog(ret);
      } else {
        uploadLogs(ret);
      }
    }
  }).catch((err) => {
    _log(err);
    storage.save({
      key: 'log',
      data: [],
    }).catch(() => {});
  });
}
