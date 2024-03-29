import KeystrokesImage from './Base64/Keystrokes.js';
import FullbrightImage from './Base64/Fullbright.js';
import XpHudImage from './Base64/XpHud.js';
import MangaFontImage from './Base64/MangaFont.js';

import { Init as KeystrokesInit } from '../Modules/Keystrokes';
import { Init as FullbrightInit } from '../Modules/Fullbright';
import { Init as XpHudInit } from '../Modules/XpHud';
import { Init as MangaFontInit } from '../Modules/MangaFont';

export const ModulesList = [
  {
    name: "Keystrokes",
    imagedata: KeystrokesImage,
    init: KeystrokesInit
  },
  {
    name: "Fullbright",
    imagedata: FullbrightImage,
    init: FullbrightInit
  },
  {
    name: "XpHud",
    imagedata: XpHudImage,
    init: XpHudInit
  },
  {
    name: "MangaFont",
    imagedata: MangaFontImage,
    init: MangaFontInit
  }
];