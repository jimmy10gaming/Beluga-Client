ModAPI.require('player')

let songplayer = new Audio()
songplayer.volume = 0.1

ModAPI.addEventListener('sendchatmessage', function(e) {
    const command = e.message.split(" ");
    if (command[0] === '.play') {
        e.preventDefault = true
        if (command.length >= 3) {
            const service = command[1].toLowerCase();
            const link = command.slice(2).join(" ");
            playMusic(service, link);
        } else {
            ModAPI.displayToChat({msg: '§6[§4ERROR§6] §cPlease specify a valid service (YouTube or Spotify)'});
        }
    } else if (e.message == '.pause') {
        e.preventDefault = true
        songplayer.pause();
        ModAPI.displayToChat({msg: '§3Music paused'});
    } else if (e.message == '.replay') {
        e.preventDefault = true
        songplayer.load();
        songplayer.play();
        ModAPI.displayToChat({msg: '§3Music replayed'});
    } else if (e.message.startsWith('.volume ')) {
        e.preventDefault = true
        try {
            songplayer.volume = (e.message.substr(8) / 100)
            ModAPI.displayToChat({msg: '§3Volume set to '+ (e.message.substr(8) / 100)})
        } catch (error) {
            ModAPI.displayToChat({msg: "§6[§4ERROR§6] §c"+error})
        }
    }
})

function playMusic(service, url) {
    if (service === "youtube") {
        // Use youtube-dl or similar library to download the audio from the YouTube link
        // Then set the downloaded audio as the source for the songplayer
        // Example:
        // songplayer.src = "https://www.example.com/downloaded-audio.mp3";
        ModAPI.displayToChat({msg: '§3Now playing music from YouTube'});
    } else if (service === "spotify") {
// Use a Spotify API to access the playlist and retrieve the tracks
        // Then set one of the tracks as the source for the songplayer
        // Example:
        // songplayer.src = "https://www.example.com/spotify-track.mp3";
        ModAPI.displayToChat({msg: '§3Now playing music from Spotify'});
    } else {
        ModAPI.displayToChat({msg: '§6[§4ERROR§6] §cPlease specify a valid service (YouTube or Spotify)'});
    }
}