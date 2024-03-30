class AudioSystem {
    constructor() {
      this.songplayer = new Audio('https://files.catbox.moe/k4j25x.mp3');
      this.songplayer.volume = 0.1;
      this.oldVolume = this.songplayer.volume;
      this.loopToggle = false;
    }
  
    play() {
      this.songplayer.play();
      ModAPI.displayToChat({ msg: '§3Now playing lo-fi' });
    }
  
    pause() {
      this.songplayer.pause();
      ModAPI.displayToChat({ msg: '§3Lo-fi paused' });
    }
  
    replay() {
      this.songplayer.load();
      ModAPI.displayToChat({ msg: '§3Replaying lo-fi' });
    }
  
    setVolume(volume) {
      try {
        this.songplayer.volume = volume / 100;
        this.oldVolume = this.songplayer.volume;
        ModAPI.displayToChat({ msg: '§3Volume set to ' + volume });
      } catch (error) {
        ModAPI.displayToChat({ msg: "§6[§4ERROR§6] §c" + error });
      }
    }
  
    setSong(url) {
      this.songplayer.pause();
      this.songplayer = new Audio(url);
      this.songplayer.volume = this.oldVolume;
      ModAPI.displayToChat({ msg: '§3URL was set to §6[ §b' + url + ' §6]' });
    }
  
    toggleLoop() {
      this.songplayer.loop = this.loopToggle;
      this.loopToggle = !this.loopToggle;
      ModAPI.displayToChat({ msg: '§3Loop is now set to §6[ §a' + this.loopToggle + ' §6]' });
    }
  }
  
  // Usage
  const audioSystem = new AudioSystem();
  
  ModAPI.addEventListener('sendchatmessage', (e) => {
    if (e.message == '.play') {
      e.preventDefault = true;
      audioSystem.play();
    } else if (e.message == '.pause') {
      e.preventDefault = true;
      audioSystem.pause();
    } else if (e.message == '.replay') {
      e.preventDefault = true;
      audioSystem.replay();
    } else if (e.message.startsWith('.volume ')) {
      e.preventDefault = true;
      audioSystem.setVolume(parseInt(e.message.substr(8)));
    } else if (e.message.startsWith('.setsong ') && e.message.substr(9).startsWith('https://')) {
      e.preventDefault = true;
      audioSystem.setSong(e.message.substr(9));
    } else if (e.message == '.loop') {
      e.preventDefault = true;
      audioSystem.toggleLoop();
    }
  });