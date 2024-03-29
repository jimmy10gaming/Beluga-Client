export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);
    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {

        ModAPI.require("player")

        ModAPI.addEventListener("sendchatmessage", function (event) {
    event.message = event.message.split('').map(char => {
    switch(char.toLowerCase()) {
    case 'a': return '卂';
    case 'b': return '乃';
    case 'c': return '匚';
    case 'd': return 'ᗪ';
    case 'e': return '乇';
    case 'f': return '千';
    case 'g': return 'ᘜ';
    case 'h': return '卄';
    case 'i': return '丨';
    case 'j': return 'ﾌ';
    case 'k': return 'Ҝ';
    case 'l': return 'ㄥ';
    case 'm': return '爪';
    case 'n': return '几';
    case 'o': return 'ㄖ';
    case 'p': return '卩';
    case 'q': return 'Ҩ';
    case 'r': return '尺';
    case 's': return '丂';
    case 't': return 'ㄒ';
    case 'u': return 'ㄩ';
    case 'v': return 'ᐯ';
    case 'w': return '山';
    case 'x': return '乂';
    case 'y': return 'ㄚ';
    case 'z': return '乙';
    default: return char;
    }
    }).join('');
    });
    
    } else {
        console.log("Disabled Mod")
    }
}