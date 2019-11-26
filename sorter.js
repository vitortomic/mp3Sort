const config = require('./config.json')
const fs = require('fs');
const mm = require('music-metadata')

const mp3Regex = new RegExp(".mp3$")

const processFile = async (file)=>{
  const filePath = `${config.readPath}${file}`
  const tags = (await mm.parseFile(filePath)).common
  console.log(file)
  console.log(tags.artist)
  console.log(tags.album)
  await sortFile(file, filePath, tags)
}

const sortFile = async (file, filePath, tags)=>{
  const artistFolder = `${config.writePath}/${tags.artist}`
  makeFolderIfNotExists(artistFolder)
  const albumFolder = `${config.writePath}/${tags.artist}/${tags.album}`
  makeFolderIfNotExists(albumFolder)
  console.log(`${albumFolder}${file}`)
  fs.copyFileSync(filePath, `${albumFolder}/${file}`)
}

const makeFolderIfNotExists = (folderPath)=> {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
}

fs.readdirSync(config.readPath).filter(fileName=>mp3Regex.test(fileName)).forEach(processFile)
