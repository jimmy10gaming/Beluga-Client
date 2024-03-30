ModAPI.require('player')

let songplayer = new Audio('https://files.catbox.moe/k4j25x.mp3')
songplayer.volume = 0.1
let oldVolume = songplayer.volume;
let loopToggle = false()

ModAPI.addEventListener('sendchatmessage', function(e) {
    if (e.message == '.play') {
        e.preventDefault = true
        songplayer.play();
        ModAPI.displayToChat({msg: '§3Now playing lo-fi'})
    } else if (e.message == '.pause') {
        e.preventDefault = true
        songplayer.pause();
        ModAPI.displayToChat({msg: '§3Lo-fi paused'})
    } else if (e.message == '.replay') {
        e.preventDefault = true
        songplayer.load();
        ModAPI.displayToChat({msg: '§3Replaying lo-fi'})
    } else if (e.message.startsWith('.volume ')) {
        e.preventDefault = true
        try {
            songplayer.volume = (e.message.substr(8) / 100)
            oldVolume = songplayer.volume
            ModAPI.displayToChat({msg: '§3Volume set to '+ e.message.substr(8)})
        } catch (error) {
            ModAPI.displayToChat({msg: "§6[§4ERROR§6] §c"+error})
        }
    } else if (e.message.startsWith('.setsong ') && e.message.substr(9).startsWith('https://')) {
        e.preventDefault = true
        songplayer.pause()
        songplayer = new Audio(e.message.substr(9))
        songplayer.volume = oldVolume
        ModAPI.displayToChat({msg: '§3URL was set to §6[ §b' + e.message.substr(9) + ' §6]'})
    } else if (e.message == '.loop') {
        e.preventDefault = true
        songplayer.loop = loopToggle
        loopToggle = !loopToggle
        ModAPI.displayToChat({msg: '§3Loop is now set to §6[ §a'+loopToggle+' §6]'})
    }
})