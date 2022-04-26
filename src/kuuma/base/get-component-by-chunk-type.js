import Box from '../components/content/Box.js';
import Button from '../components/content/Button.js';
import H1 from '../components/content/H1.js';
import H2 from '../components/content/H2.js';
import List from '../components/content/List.js';
import Nav from '../components/content/Nav.js';
import P from '../components/content/P.js';
import Shortcut from '../components/content/Shortcut.js';

import Dropdown from '../components/interface/Dropdown.js';
import Header from '../components/interface/Header.js';

import Error500 from '../components/templates/Error500.js';
import Default from '../components/templates/Default.js';

const map = {
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

  'templates/error500': Error500,
  'templates/default': Default,
};

export default function getComponentByChunkType(type) {
  return map[type];
}
