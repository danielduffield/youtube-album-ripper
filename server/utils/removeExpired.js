const fs = require('fs-extra')
const path = require('path')

const timeLimit = 10
const filePath = path.join(__dirname, '../downloaded')
const minutes = 1000 * 60

function removeExpired() {
  const expired = findExpired(getFileStats(filePath))
  let filesDeleted = 0
  expired.then(dirInfo => {
    Promise.all(dirInfo.map(dir => {
      const expiredFilePath = path.join(__dirname, '../downloaded/', dir.fileName)
      console.log('DELETING FILE: ', expiredFilePath)
      filesDeleted++
      return fs.remove(expiredFilePath)
    })).then(() => console.log(filesDeleted + ' Expired directories deleted.'))
  })
}

function findExpired(fileStats) {
  return fileStats.then(dataArr => {
    return dataArr.filter(fileData => (Date.now() - fileData.stats.birthtimeMs) / minutes > timeLimit)
  })
}

function getFileStats(dir) {
  return fs.readdir(dir).then((files) => {
    return Promise.all(files.map(fileName => {
      const filePath = path.join(__dirname, '../downloaded/', fileName)
      return fs.stat(filePath)
    })).then(fileStats => fileStats.map((stats, index) => {
      return { fileName: files[index], stats: Object.assign({}, stats) }
    }))
  })
}

module.exports = removeExpired
