// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Header scroll hide/show effect
let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  if (currentScrollY > 100) {
    header.style.background = 'rgba(30, 30, 30, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 92, 255, 0.1)';
  } else {
    header.style.background = 'rgba(30, 30, 30, 0.95)';
    header.style.boxShadow = 'none';
  }

  lastScrollY = currentScrollY;
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const overlay = document.getElementById('overlay');

function openMobileMenu() {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Counter animation
const animateCounters = () => {
 const counters = document.querySelectorAll('.stat-number:not(.no-counter)'); 
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }
    }, 20);
  });
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

const servicoSelect = document.getElementById('servico');
const outroInput = document.getElementById('outroServico');

if (servicoSelect && outroInput) {
  servicoSelect.addEventListener('change', () => {
    if (servicoSelect.value === 'outros') {
      outroInput.style.display = 'block';
      outroInput.required = true;
    } else {
      outroInput.style.display = 'none';
      outroInput.required = false;
    }
  });
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const loadingOverlay = document.getElementById('loading');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Mostrar loading e desabilitar botão
  loadingOverlay.style.display = 'flex';
  submitButton.disabled = true;

  const formData = new FormData(form);

  fetch('https://formsubmit.co/ajax/pedroaugusto06082004@gmail.com', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
  .then(response => {
    loadingOverlay.style.display = 'none';
    submitButton.disabled = false;

    if (response.ok) {
      form.reset();
      document.getElementById('popup').style.display = 'flex';
    } else {
      document.getElementById('popup-erro').style.display = 'flex';
    }
  })
  .catch(error => {
    loadingOverlay.style.display = 'none';
    submitButton.disabled = false;

    console.error(error);
    document.getElementById('popup-erro').style.display = 'flex';
  });
});

// Fecha o popup de sucesso
document.getElementById('fecharPopup').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
});

// Fecha o popup de erro
document.getElementById('fecharPopupErro').addEventListener('click', () => {
  document.getElementById('popup-erro').style.display = 'none';
});

window.addEventListener('load', () => {
  if (window.location.hash === '#popup') {
    document.getElementById('popup').style.display = 'flex';
  }
});