import fs from 'fs';

export default function inputJson(path) {
  const file = fs.readFileSync(path, 'utf8');
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
