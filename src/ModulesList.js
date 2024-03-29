import ClientLogo from './Base64/ClientLogo.png';
import KeystrokesImage from './Base64/Keystrokes.png';
import FullbrightImage from './Base64/Fullbright.png';
import XpHudImage from './Base64/XpHud.png';
import MangaFontImage from './Base64/MangaFont.png';

import { Init as KeystrokesInit } from './Modules/Keystrokes';
import { Init as FullbrightInit } from './Modules/Fullbright';
import { Init as XpHudInit } from './Modules/XpHud';
import { Init as MangaFontInit } from './Modules/MangaFont';

export const LogoData = ClientLogo;

export const ModulesList = [
  {
    name: "LogoData",
    imagedata: LogoDataImage,
    init: LogoDataInit
  },
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