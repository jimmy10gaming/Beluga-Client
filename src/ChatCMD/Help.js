ModAPI.addEventListener('sendchatmessage', function(m) {

    if (m.message == '.help') {
        m.preventDefault = true
        ModAPI.displayToChat({msg: `
§6[-COMMANDS-]
§3.help §6\| §aDisplays this help dialogue
§3.spawn §6\| §aAttempts to set player coordinates to 0, 0
§3.pos §6\| §aSends a chat message with your current position
§3.time §6\| §aSends a chat message with your current time
§3.lastpos §6\| §aAttempts to return you to your last position
§3.goto §6\| §aAttempts to teleport to the set position
§3.setpos §6\| §aSets the position for .goto
§3.bugreport §b[msg] §6\| §aSends a message through a webhook
§3.play §6\| §aPlays lo-fi (19 minutes long)
§3.pause §6\| §aPauses the lo-fi
§3.replay §6\| §aReplays the lo-fi
§3.volume §b[int] §6\| §aSets the volume of the lo-fi (max is 100)
§3.src §6\| §aOpens a new tab with the src of the project
        `})
         }
    }
)