let musicContainer = document.querySelector('.music-container');
let audio = document.querySelector('#audio');
let playBtn = document.querySelector('.playBtn');
let songListDiv = document.querySelector('#song-list');
let currentTimeSpan = document.querySelector('#currentTime');
let totalTime = document.querySelector('#totalTime');
let progressContainer = document.querySelector('.progress-container');
let progress = document.querySelector('.progress');
let userVolume = document.querySelector('#volume');
let hiddenSongTitle = document.querySelector('.hidden-songtitle');

let songList = [
  {
    name: 'Song 1',
    song: 'https://www.kozco.com/tech/piano2-Audacity1.2.5.mp3',
  },
  {
    name: 'Song 2',
    song: 'https://file-examples.com/storage/feb401d325641db2fa1dfe7/2017/11/file_example_MP3_700KB.mp3',
  },
  {
    name: 'Song 3',
    song: 'https://file-examples.com/storage/feb401d325641db2fa1dfe7/2017/11/file_example_MP3_1MG.mp3',
  },
];

/* Initial Setup */
function setTable() {
  let table = '<table class="song-list-table">';
  songList.map((song, index) => {
    table += `<tr
            class=${
              hiddenSongTitle.textContent === song.song
                ? 'active-song'
                : hiddenSongTitle.textContent === '' && index === 0
                ? 'active-song'
                : ''
            }
            >
            <td>${
              hiddenSongTitle.textContent === song.song
                ? '<i class="fa-solid fa-check"></i>'
                : hiddenSongTitle.textContent === '' && index === 0
                ? '<i class="fa-solid fa-check"></i>'
                : ''
            }</td>
            <td onclick="changeSong(this.getAttribute('data-song'))" data-song=${
              song.song
            } class="song-title">${song.name}</td>
        </tr>`;
  });
  table += '</table>';
  songListDiv.innerHTML = table;
  currentTimeSpan.innerHTML = '0:00';
  totalTime.innerHTML = '0:00';
}
setTable();

/*
    This function plays the song that's populated in audio.src
*/
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

/*
    This function pauses the songs that's currently playing
*/
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

function changeSong(songURL) {
  //   currentTimeSpan.innerHTML = '0.00';
  //   totalTime.innerHTML = '0.00';
  audio.src = songURL;
  progress.style.width = 0;
  hiddenSongTitle.innerHTML = songURL;
  setTable();
  pauseSong();
  playSong();
}

function updateProgress(e) {
  audio.volume = userVolume.value;
  const { duration, currentTime } = e.srcElement;
  totalTime.innerHTML = duration === 'NaN' ? '0.00' : duration.toFixed(2);
  currentTimeSpan.innerHTML = currentTime.toFixed(2);
  if (currentTime >= duration) {
    currentTimeSpan.innerHTML = 0;
    pauseSong();
  }
  let progressPercent =
    currentTime === duration ? 0 : (currentTime / duration) * 100;
  progress.style.width = progressPercent + '%';
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);
