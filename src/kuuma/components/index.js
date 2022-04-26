import Box from './content/box.js';
import Button from './content/button.js';
import H1 from './content/h1.js';
import H2 from './content/h2.js';
import List from './content/list.js';
import Nav from './content/nav.js';
import P from './content/p.js';
import Shortcut from './content/shortcut.js';

import Dropdown from './interface/dropdown.js';
import Header from './interface/header.js';

import Error500 from './templates/500.js';
import Default from './templates/default.js';

const chunks = {
  'content/box': Box,
  'content/button': Button,
  'content/h1': H1,
  'content/h2': H2,
  'content/list': List,
  'content/nav': Nav,
  'content/p': P,
  'content/shortcut': Shortcut,

  'interface/dropdown': Dropdown,
  'interface/header': Header,

  'templates/500': Error500,
  'templates/default': Default,
};

export default chunks;
