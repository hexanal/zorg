import fs from 'fs';

// TODO make it sturdy, catch errors, etc.
export const createDir = function(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) reject(err)
      resolve(dir)
    })
  })
}

export const writeFile = function(filePath, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, contents, (err) => {
      if (err) reject(err)
      resolve({ dir: filePath, contents })
    })
  })
}

export const write = function(destination, fileName, contents, verbose = false ) {
  return createDir( destination )
    .then(() => writeFile(`${destination}/${fileName}`, contents) );
}
