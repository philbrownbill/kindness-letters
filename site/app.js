const config = window.KINDNESS_CONFIG || {};
if (config.logo) {
  document.querySelectorAll('.brand-logo').forEach(img => {
    img.addEventListener('load', () => { img.hidden = false; img.previousElementSibling.hidden = true; });
    img.src = config.logo;
  });
}
document.querySelectorAll('.campaign').forEach(el => { el.textContent = config.campaign || ''; el.hidden = !config.campaign; });
const intro = document.querySelector('#hero-intro');
if (intro && config.introduction) intro.textContent = config.introduction;
const about = document.querySelector('#about-season');
if (about && config.aboutSeason) about.textContent = config.aboutSeason;
if (config.phase === 'recipient' && intro) {
  document.body.classList.add('recipient-mode');
  document.querySelector('#hero-title').textContent = 'Have you received a Kindness Letter?';
  intro.textContent = 'Someone took a little time out of their day to write something kind, and this letter found its way to you. There’s nothing you need to do. No reply expected. It’s simply a little kindness, just for you.';
  document.querySelector('.hero-note').textContent = 'Yours to keep. Nothing expected in return.';
  document.querySelector('#received').hidden = true;
  document.querySelectorAll('.campaign').forEach(el => el.hidden = true);
}
const email = (config.email || '').trim();
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const status = document.querySelector('#contact-status');
document.querySelectorAll('[data-email]').forEach(link => {
  if (validEmail) {
    const subject = link.dataset.email === 'write' ? 'We’d like to write Kindness Letters' : 'We’d like to share Kindness Letters';
    link.href = 'mailto:' + encodeURIComponent(email) + '?subject=' + encodeURIComponent(subject);
  } else {
    link.href = 'index.html#contact';
    link.addEventListener('click', () => { if (status) status.textContent = 'Our project email is coming soon. Please check back to get involved.'; });
  }
});
if (validEmail && status) {
  const address = document.createElement('a');
  address.href = 'mailto:' + encodeURIComponent(email);
  address.textContent = email;
  status.replaceChildren('Email us at ', address, '. These buttons open your email app.');
}
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
