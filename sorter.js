const config = require('./config.json')
const fs = require('fs');
const mm = require('music-metadata')
const util = require('util')

console.log(config.path)

mm.parseFile('../file_example_MP3_700KB.mp3')
  .then( metadata => {
    console.log(util.inspect(metadata, { showHidden: false, depth: null }));
  })
  .catch( err => {
    console.error(err.message);
  });