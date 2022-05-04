import fs from 'fs';
import fse from 'fs-extra';

export function parseJsonAtPath(path) {
  const file = fs.readFileSync(path, 'utf8');
  const contents = file.toString();
  let json = {}

  try {
    json = JSON.parse(contents);
  } catch(err) {
    console.error(`

**error while parsing json file:**

  -> '${item}'
  -> error message:

`);
    console.error(err);
    console.trace();
    throw err;
  }

  return json;
}

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

export function copyFile(src, dest) {
  return fse.copy(src, dest)
    .catch(err => {
      console.error(err);
    });

}

export const write = function(destination, fileName, contents, verbose = false ) {
  return createDir( destination )
    .then(() => writeFile(`${destination}/${fileName}`, contents) );
}
