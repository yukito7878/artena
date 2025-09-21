
// Mobile menu toggle
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (btn) {
	btn.addEventListener('click', () => nav.classList.toggle('open'));
}

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
	a.addEventListener('click', (e) => {
		const id = a.getAttribute('href').slice(1);
		const el = document.getElementById(id);
		if (el) {
			e.preventDefault();
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			nav && nav.classList.remove('open');
		}
	});
});

// Hero background switcher (optional): set data-hero on body to path
// <body data-hero="./assets/img/your-hero.jpg">
const hero = document.querySelector('.hero');
if (hero) {
	const path = document.body.dataset.hero;
	if (path) {
		hero.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.0) 40%), url('${path}')`;
		hero.style.backgroundSize = 'cover';
		hero.style.backgroundPosition = 'center';
	}
}
