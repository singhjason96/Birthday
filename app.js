let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();


function getPlaylist(){
  var songs=[
    './music/Rackables.mp3',
    './music/WholeLotta.mp3',
    './music/DontWaitOnMyLove.m4a',
    './music/NeverKnewMe.mp3',
    './music/ChoppaGo.mp3',
    './music/ICouldNever.mp3',
    './music/Ebony.mp3',
    './music/CB.mp3'
  ];
  var playlist =[];
  var tracks = ["Don't Wait On My Love",'Back Together', 'I Could Never', 'Your Heart', 'Ebony', 'To Feel Things', 'On It'];
  // var elem = document.getElementById('message');
  // elem.remove();

  let divContainer = document.createElement('div');
  divContainer.className = 'divContainer';

  // let el = document.getElementById('canvas');
  // el.remove();
  // let canvas = document.createElement('canvas');
  // canvas.id = 'canvas';
  // document.body.append(canvas);
 
  for(let i=0; i<songs.length; i++){
    song = new Audio(`${songs[i]}`);
    playlist.push(song);
    let playbutton = document.createElement('button');
    let bigDiv = document.createElement('div');
    bigDiv.className = "bigDiv";
    playbutton.className = "play";
    playbutton.onclick = function() {
      playlist[i].play();
    }
    bigDiv.appendChild(playbutton);
    console.log(bigDiv);
    let track = document.createElement('h3');
    track.innerHTML = tracks[i];
    track.className = "track";
    bigDiv.appendChild(track);
    let pauseButton = document.createElement('button');
        // pauseButton.innerHTML = 'Pause'; 
    pauseButton.className = 'pause';
    pauseButton.onclick = function() {
      playlist[i].pause();
    }
    bigDiv.appendChild(pauseButton);
    divContainer.appendChild(bigDiv);

    
    // document.body.append(divContainer);
    
  }
  console.log(divContainer);
  var sup = document.getElementById('surprise');
  sup.replaceWith(divContainer);
}