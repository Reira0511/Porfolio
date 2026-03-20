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