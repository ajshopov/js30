const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error("oops", err);
    })
}

function paintToCanvas (){
  const width = video.videoWidth;
  const height = video.videoHeight;
  console.log(width, height);

  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // PIXEL MANIPULATION
    let pixels = ctx.getImageData(0,0,width,height);
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.5;
    ctx.putImageData(pixels, 0, 0)
  }, 16);
}

function takePhoto(){
  // play the sound
  snap.currentTime = 0;
  snap.play();

  // take the screenshot out
  const data = canvas.toDataURL('image/jpeg');
  console.log(data);
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'nice')
  link.innerHTML = `<img src="${data}" alt="nice one">`
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    
  }
  return pixels;
}

function rgbSplit(pixels){
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue

  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);