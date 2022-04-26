import fse from 'fs-extra';
import log from '../lib/log.js';

// @todo! 
export default function inputJson(item, config ) {
  const file = fs.readFileSync(item, 'utf8');
  const contents = file.toString();
  let json = {};

  try {
    json = JSON.parse(contents);
  } catch(error) {
    console.error(`error while parsing json file '${item}'`);
    throw err;
  }

  return json;
}

// const copy = ({id, src, dest}) => {
//   const start = Date.now();

//   return fse.copy(src, dest)
//     .then(() => {
//       const time = Date.now() - start;
//       log( `assets: copied '${id}' ~~ ${time}ms` );
//     })
//     .catch(err => {
//       log( `assets: huh?! something broke while copying assets: '${id}'` );
//       console.error( err );
//     });
// }
