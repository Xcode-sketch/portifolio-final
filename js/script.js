const theme = document.body.querySelector("#theme");
const body = document.body;

const root = document.documentElement;


function darkTheme(isdark) {
  if(isdark == true) {
    body.classList.add('dark');
    theme.innerHTML = '<a href="#"><i class="fa-solid fa-sun"></i></i></a>';
    root.style.setProperty('--destaque', '#000000ff');
  } else {
    body.classList.remove('dark');
    theme.innerHTML = '<a href="#"><i class="fa-solid fa-moon"></i></i></a>';
    root.style.setProperty('--destaque', '#0077ff');
  }
}

theme.addEventListener('click', () => {
  const isdark = body.classList.toggle('dark');
  darkTheme(isdark);
  localStorage.setItem('theme', 'isdark' ? 'dark' : 'white');
})

// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});