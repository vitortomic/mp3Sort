const config = require('./config.json')
const fs = require('fs');
const mm = require('music-metadata')

const mp3Regex = new RegExp(".mp3$")

const processFile = async (file)=>{
  filePath = `${config.path}${file}`
  let tags = (await mm.parseFile(filePath)).common
  console.log(tags.artist)
  console.log(tags.album)
}

fs.readdirSync(config.path).filter(fileName=>mp3Regex.test(fileName)).forEach(processFile)
