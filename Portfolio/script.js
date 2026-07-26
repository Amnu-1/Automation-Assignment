/* ===== DOM ===== */
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const typingEl = document.getElementById('typing-text');
const revealEls = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-card__number');
const sections = document.querySelectorAll('section[id]');

/* ===== Typing Animation ===== */
const phrases = [
  'Aspiring QA Engineer',
  'Manual Testing Enthusiast',
  'Quality-Focused Professional'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const current = phrases[phraseIndex];
  typingEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = isDeleting ? 40 : 70;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

/* ===== Theme Toggle ===== */
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.querySelector('i').className =
  savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.querySelector('i').className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

/* ===== Mobile Nav ===== */
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show'));
});

/* ===== Smooth Scroll ===== */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ===== Scroll Events ===== */
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('show', window.scrollY > 400);

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== Scroll Reveal (Intersection Observer) ===== */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObserver.observe(el));

/* ===== Animated Counters ===== */
const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const isYear = target > 1000;
      let count = 0;
      const step = isYear ? 1 : Math.ceil(target / 30);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = count;
        }
      }, isYear ? 30 : 40);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
statNumbers.forEach(el => counterObserver.observe(el));

/* ===== Contact Form Validation ===== */
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const fields = [
    { id: 'name', rule: v => v.trim().length >= 2, msg: 'Name must be at least 2 characters.' },
    { id: 'email', rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Enter a valid email address.' },
    { id: 'subject', rule: v => v.trim().length >= 3, msg: 'Subject is required.' },
    { id: 'message', rule: v => v.trim().length >= 10, msg: 'Message must be at least 10 characters.' }
  ];

  fields.forEach(({ id, rule, msg }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    if (!rule(input.value)) {
      error.textContent = msg;
      input.classList.add('invalid');
      valid = false;
    } else {
      error.textContent = '';
      input.classList.remove('invalid');
    }
  });

  if (valid) {
    alert('Thank you! Your message has been sent successfully.');
    contactForm.reset();
  }
});