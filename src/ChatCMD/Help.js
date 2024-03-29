const { CommandList } = require("../CommandList");

ModAPI.addEventListener('sendchatmessage', function(m) {

    if (m.message == '.help') {
        m.preventDefault = true
        ModAPI.displayToChat({msg: `
§6[-COMMANDS-]

§0==============================================
§6[Music-Controlls]
§3.help §6\| §aDisplays this help dialogue
§3.play §6\| §aPlays lo-fi (19 minutes long)
§3.pause §6\| §aPauses the lo-fi
§3.replay §6\| §aReplays the lo-fi
§3.volume §b[int] §6\| §aSets the volume of the lo-fi (max is 100)
        `})
         }
    }
)