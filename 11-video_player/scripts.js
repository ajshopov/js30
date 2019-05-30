// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

//  build out functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // same as this...
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

function updatePlayButton() {
    console.log('update button');
    const icon = this.paused ? '►' : '❚ ❚'; // this -> bound to the video
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset);
    console.log(this.dataset.skip);
    console.log(video.currentTime);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log(this.value);
    // console.log(this.name);
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime; 
}

function toggleFullScreen() {
    video.requestFullscreen();
}

//  hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});
ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
});
ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate);
});
fullScreen.addEventListener('click', toggleFullScreen);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// if mousedown false, doesn't run scrub
// 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
