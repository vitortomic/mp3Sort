const config = {
  writePath: "./",
  readPath: "./"
}
const fs = require('fs');
const mm = require('music-metadata')

const mp3Regex = new RegExp(".mp3$")
let counter = 0

const processFile = async (file, key, array)=>{
  try {
    console.log(file)
    const filePath = `${config.readPath}${file}`
    const tags = (await mm.parseFile(filePath)).common
    await sortFile(file, filePath, tags)
    counter++
    if (key == array.length-1) {
      console.log(`Sorted ${counter} mp3 files`)
    }
  } catch (error) {
    console.log(error)
  }
  
}

const sortFile = async (file, filePath, tags)=>{
  let writePath = `${config.writePath}`
  if (tags.artist) {
    writePath = `${writePath}/${tags.artist}`
    makeFolderIfNotExists(writePath)
  }
  if (tags.album) {
    writePath = `${writePath}/${tags.album}`
    makeFolderIfNotExists(writePath)
  }
  fs.copyFileSync(filePath, `${writePath}/${file}`)
  console.log(`Copied ${file} to ${writePath}`)
}

const makeFolderIfNotExists = (folderPath)=> {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
    console.log(`Created folder: ${folderPath}`)
  }
}


fs.readdirSync(config.readPath).filter(fileName=>mp3Regex.test(fileName)).forEach(processFile)
