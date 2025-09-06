const theme = document.body.querySelector("#theme");
const body = document.body;

const root = document.documentElement;


function darkTheme(isdark) {
  if (isdark == true) {
    body.classList.add('dark');
    theme.innerHTML = '<a href="#"><i class="fa-solid fa-sun"></i></i></a>';
    root.style.setProperty('--destaque', '#ffd900ff');
    root.style.setProperty('--destaque-inverso', '#91843eff')
    root.style.setProperty('--fundo-principal', '#1f1f1fff');
    root.style.setProperty('--fundo-card', '#464646ff');
    root.style.setProperty('--texto', '#FFFFFF');
  } else {
    body.classList.remove('dark');
    theme.innerHTML = '<a href="#"><i class="fa-solid fa-moon"></i></i></a>';
    root.style.setProperty('--destaque', '#0077ff');
    root.style.setProperty('--destaque-inverso', '#66bbff');
    root.style.setProperty('--fundo-principal', '#f5f5f5');
    root.style.setProperty('--fundo-card', '#ffffff');
    root.style.setProperty('--texto', '#222222');
  }
}

theme.addEventListener('click', () => {
  const isdark = body.classList.toggle('dark');
  darkTheme(isdark);
})

// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
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

const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=-23.3217&longitude=-46.7269&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,rain,relative_humidity_2m,precipitation_probability&timezone=America%2FSao_Paulo';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na rede: ' + response.statusText);
    }

    return response.json();
  })
  .then(data => {

    console.log('Dados recebidos da API:', data);


    displayWeatherData(data);
  })
  .catch(error => {

    console.error('Ocorreu um problema ao buscar os dados do clima:', error);
    document.getElementById('weather-data').innerText = 'Falha ao carregar os dados do tempo.';
  });

function displayWeatherData(data) {
  const weatherDiv = document.querySelector('.weather-data');

  weatherDiv.innerHTML = '';

  const today = data.daily;
  const maxTemp = today.temperature_2m_max[0];
  const minTemp = today.temperature_2m_min[0];

  weatherDiv.innerHTML += `<i class="fa-solid fa-cloud-sun"></i><h2>Previsão para Minha Cidade</h2>`;
  weatherDiv.innerHTML += `<p>Máxima: ${maxTemp}°C</p>`;
  weatherDiv.innerHTML += `<p>Mínima: ${minTemp}°C</p>`;


  const hourly = data.hourly;
  const now = new Date();
  const currentHour = now.getHours();


  const timeIndex = hourly.time.findIndex(time => new Date(time).getHours() >= currentHour);

  if (timeIndex !== -1) {
    const currentTemp = hourly.temperature_2m[timeIndex];
    const rainChance = hourly.precipitation_probability[timeIndex];
    const humidity = hourly.relative_humidity_2m[timeIndex];

    weatherDiv.innerHTML += `<p>Temperatura Agora: ${currentTemp}°C</p>`;
    weatherDiv.innerHTML += `<p>Chance de Chuva: ${rainChance}%</p>`;
    weatherDiv.innerHTML += `<p>Umidade Relativa: ${humidity}%</p>`;
  }
}