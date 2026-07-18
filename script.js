/* ============================================================
   script.js — Portfolio Website JavaScript
   Link this at the bottom of index.html:  <script src="script.js"></script>
   ============================================================ */


/* ── 1. TYPEWRITER EFFECT ────────────────────────────────────
   Cycles through different job roles in the hero section.
   Add or remove strings from the `roles` array to customise.
   ──────────────────────────────────────────────────────────── */

const roles = [
  '"React Developer"',
  '"Node.js Engineer"',
  '"UI/UX Enthusiast"',
  '"Problem Solver"',
  '"Full Stack Dev"',
];

let roleIndex = 0;   // which role we're currently showing
let charIndex  = 0;  // how many characters typed so far
let isDeleting = false;

const typewriterEl = document.getElementById('typewriter');

function type() {
  const currentWord = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward: add one character
    charIndex++;
    typewriterEl.textContent = currentWord.slice(0, charIndex);

    if (charIndex === currentWord.length) {
      // Finished typing — pause before deleting
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    // Deleting: remove one character
    charIndex--;
    typewriterEl.textContent = currentWord.slice(0, charIndex);

    if (charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  // Typing is slower than deleting for a natural feel
  const speed = isDeleting ? 55 : 90;
  setTimeout(type, speed);
}

// Start the typewriter after a short delay
setTimeout(type, 500);


/* ── 2. SCROLL FADE-IN ANIMATIONS ───────────────────────────
   Uses IntersectionObserver to reveal elements with class
   `.fade-in` as they scroll into view.
   CSS in style.css handles the actual transition.
   ──────────────────────────────────────────────────────────── */

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.12 } // trigger when 12% of element is visible
);

// Observe every element that should fade in
document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));


/* ── 3. ACTIVE NAV LINK HIGHLIGHT ────────────────────────────
   Highlights the correct nav link based on scroll position.
   ──────────────────────────────────────────────────────────── */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener(
  'scroll',
  () => {
    let currentSection = '';

    sections.forEach((section) => {
      // Mark a section as "current" when scrolled 140px past its top
      if (window.scrollY >= section.offsetTop - 140) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentSection}`
      );
    });
  },
  { passive: true } // improves scroll performance
);


/* ── 4. MOBILE HAMBURGER MENU ────────────────────────────────
   Toggles the nav links on small screens.
   Called via onclick="toggleMenu()" in index.html.
   ──────────────────────────────────────────────────────────── */

function toggleMenu() {
  const navLinksEl = document.getElementById('navLinks');
  const isOpen = navLinksEl.style.display === 'flex';

  if (isOpen) {
    // Close menu
    navLinksEl.style.cssText = '';
  } else {
    // Open menu as a vertical dropdown
    navLinksEl.style.cssText = `
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      background: rgba(10, 15, 30, 0.97);
      padding: 20px 24px;
      gap: 16px;
      border-bottom: 1px solid var(--border);
    `;
  }
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    const navLinksEl = document.getElementById('navLinks');
    navLinksEl.style.cssText = ''; // reset to CSS default (hidden on mobile)
  });
});


/* ── 5. CONTACT FORM HANDLER ─────────────────────────────────
   Handles form submission.

   TO CONNECT A REAL BACKEND, replace the setTimeout block with
   one of these options:

   Option A — Formspree (no backend needed):
     Set your <form action="https://formspree.io/f/YOUR_ID" method="POST">
     and remove the onsubmit handler entirely.

   Option B — EmailJS (no backend needed):
     https://www.emailjs.com — call emailjs.send() here.

   Option C — Your own Node.js/Express API:
     Use fetch() to POST to your /api/contact endpoint.
   ──────────────────────────────────────────────────────────── */

function handleSubmit(event) {
  event.preventDefault(); // prevent default page reload

  const submitBtn = document.getElementById('submitBtn');

  // Show loading state
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled    = true;

  /* ---- Replace this block with your real API call ---- */
  setTimeout(() => {
    submitBtn.textContent = '✅ Message Sent!';
    event.target.reset(); // clear the form fields

    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.textContent = 'Send Message ✉️';
      submitBtn.disabled    = false;
    }, 3000);
  }, 1200);
  /* ---------------------------------------------------- */

  /*
  // Example with fetch() to your own backend:
  const formData = {
    name:    document.getElementById('name').value,
    email:   document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  fetch('/api/contact', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then(() => {
      submitBtn.textContent = '✅ Message Sent!';
      event.target.reset();
    })
    .catch(() => {
      submitBtn.textContent = '❌ Error — try again';
    })
    .finally(() => {
      submitBtn.disabled = false;
      setTimeout(() => { submitBtn.textContent = 'Send Message ✉️'; }, 3000);
    });
  */
}
