import Logo from "./Base64/ClientLogo.png";
import Keystrokesimg from "./Base64/Keystrokes.png";
import Fullbrightimg from "./Base64/Fullbright.png";
import XpHudimg from "./Base64/XpHud.png";
import MangaFontimg from "./Base64/MangaFont.png";
import ToggleSprintimg from "./Base64/ToggleSprint.png";
import ChatShortcutsimg from "./Base64/ChatShortcuts.png";
import ChatShortcutsimg from "./Base64/Xray.png";
import ChatShortcutsimg from "./Base64/blink.png";
import ChatShortcutsimg from "./Base64/StatHUD.png";

export const LogoData = Logo;

export const ModulesList = [
  {
    name: "Keystrokes",
    imagedata: Keystrokesimg,
    category: "HUD",
    description: "Display key presses on screen"
  },
  {
    name: "Fullbright",
    imagedata: Fullbrightimg,
    category: "Visual",
    description: "Increase brightness to maximum"
  },
  {
    name: "XpHud",
    imagedata: XpHudimg,
    category: "HUD",
    description: "Show XP information on screen"
  },
  {
    name: "MangaFont",
    imagedata: MangaFontimg,
    category: "Visual",
    description: "Change font to manga style"
  },
  {
    name: "ToggleSprint",
    imagedata: ToggleSprintimg,
    category: "Movement",
    description: "Toggle sprint on/off"
  },
  {
    name: "ChatShortcuts",
    imagedata: ChatShortcutsimg,
    category: "Utility",
    description: "Quick chat commands"
  },
  {
    name: "Xray",
    imagedata: XrayImg,
    init: XrayInit
}
{
    name: "blink",
    imagedata: blinkImg,
    init: blinkInit
}
{
    name: "StatHUD",
    imagedata: StatHUDImg,
    init: StatHUDInit
}
