let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
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