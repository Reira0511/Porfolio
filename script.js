let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
}


const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries()); 

  fetch(contactForm.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      alert('Message sent successfully!');
      contactForm.reset(); 
    } else {
      alert('There was a problem sending your message.');
    }
  })
  .catch(error => {
    alert('There was a network error. Please try again.');
  });
});

function createStars(i){
  for(let j = 0; j < i; j++){
    drawStars();
  }
}
function drawStars(){
  var tmpStar = document.createElement('figure');
  tmpStar.classList.add('star');
  tmpStar.style.top = (100*Math.random())+'%';
  tmpStar.style.left = (100*Math.random())+'%';

  let size = (Math.random() * 3) + 2;
  tmpStar.style.width = size + 'px';
  tmpStar.style.height = size + 'px';

tmpStar.style.animationDuration = (Math.random() * 4 + 2) + 's';
tmpStar.style.animationDelay = '-' + (Math.random() * 5) + 's';


document.getElementById('stars').appendChild(tmpStar);
}
document.addEventListener('DOMContentLoaded', () => {
  createStars(250);
});
/*
function selectStars(){
  stars = document.querySelectorAll('.star');
  console.log(stars);
}
function animateStars(){
  Array.prototype.forEach.call(stars, function(el, i){
    TweenMax.to(el, Math.random() * 0.5 + 0.5,{
      opacity: Math.random(), onComplete: animateStars
    });
  });
}
createStars(200);
selectStars();
animateStars();
*/

document.addEventListener('DOMContentLoaded', () => {
  createStars(200);

  const canvas = document.getElementById('turing');
  if(!canvas) return;

  const ctx = canvas.getContext('2d');
  const projectSection = document.querySelector('.projects');
  let width = 0
  let height = 0;

  function resize() {
    width = projectSection.clientWidth;
    height = projectSection.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  const cellSize = 50;
  let offset = 0;
  const speed = 0.5;
  let headActionTimer = 0;

  const tape = Array.from({ length: 100 }, () =>
    Math.random() > 0.5 ? '1' : '0'
  );

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const tapeY = height * 0.4;
    const cellsOnScreen = Math.ceil(width / cellSize) + 2;

    offset -= speed;
    if (offset <= -cellSize) {
      offset += cellSize;
      tape.shift();
      tape.push(Math.random() > 0.5 ? '1' : '0');
    }

    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < cellsOnScreen; i++) {
      const x = i * cellSize + offset;
      const symbol = tape[i % tape.length];

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.strokeRect(x, tapeY, cellSize, cellSize);

      ctx.fillStyle =
        symbol === '1'
          ? 'rgba(84, 104, 232, 0.8)'
          : 'rgba(255, 255, 255, 0.35)';
      ctx.fillText(symbol, x + cellSize / 2, tapeY + cellSize / 2);
    }

    const targetCell = Math.floor(cellsOnScreen / 2);
    headActionTimer++;

    if (headActionTimer > 120) {
      tape[targetCell] = tape[targetCell] === '1' ? '0' : '1';
      headActionTimer = 0;
    }

    const headX = targetCell * cellSize + offset + cellSize / 2;
    const headTopY = tapeY - 55;
    const headMidY = tapeY - 18;
    const headTipY = tapeY - 2;

    ctx.fillStyle = '#5468e8';
    ctx.fillRect(headX - 2, headTopY, 4, 40);

    ctx.beginPath();
    ctx.moveTo(headX, headTipY);
    ctx.lineTo(headX - 12, headMidY);
    ctx.lineTo(headX + 12, headMidY);
    ctx.closePath();
    ctx.fillStyle = 'rgba(84, 104, 232, 0.7)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(headX, headTopY, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#5468e8';
    ctx.fill();
    ctx.shadowBlur = 0;

    requestAnimationFrame(draw);
  }
  draw();
});
