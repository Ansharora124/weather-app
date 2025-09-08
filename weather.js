const apiKey ="f223f88d2a3f64bf71ddcc2331608e1c";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector('.search input');
const searchButton=document.querySelector('.search button');
const weatherIcon=document.querySelector('.image img');
const weatherBackgroundEl=document.querySelector('.background-image');

function setBackgroundImage(bgFile) {
  if (!weatherBackgroundEl) return;
  // Use a relative folder if you keep images in an images/ folder e.g. './images/sunny.jpeg'
  const url = `./${bgFile}`;
  console.log('Attempting background:', url);
  const img = new Image();
  img.onload = () => {
    console.log('Background loaded:', url);
    weatherBackgroundEl.style.backgroundImage = `url('${url}')`;
    weatherBackgroundEl.style.backgroundSize = 'cover';
    weatherBackgroundEl.style.backgroundPosition = 'center';
    weatherBackgroundEl.style.backgroundRepeat = 'no-repeat';
    // clear any fallback color
    weatherBackgroundEl.style.backgroundColor = '';
  };
  img.onerror = () => {
    console.warn('Background failed to load:', url);
    // fallback to a known good file (update if necessary)
    if (bgFile !== 'winter.png') {
      console.log('Falling back to winter.png');
      setBackgroundImage('winter.png');
    } else {
      // final fallback: solid color
      weatherBackgroundEl.style.backgroundImage = 'none';
      weatherBackgroundEl.style.backgroundColor = '#0b1220';
    }
  };
  img.src = url;
}

async function checkWeather(city) {
  if (!city) return;
  try {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);
    if (!response.ok) {
      alert('City not found or network error');
      return;
    }
    const data = await response.json();
    console.log('weather API response:', data);

    const currentDate = new Date();
    const dateEl = document.querySelector('.date-class');
    if (dateEl) {
      dateEl.textContent = currentDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    const weatherMain = data.weather && data.weather[0] && data.weather[0].main ? data.weather[0].main : '';
    console.log('weatherMain:', weatherMain);

    const seasonEl = document.querySelector('.season');
    if (seasonEl) seasonEl.textContent = weatherMain;
    const cityEl = document.querySelector('.city');
    if (cityEl) cityEl.textContent = data.name;
    const tempEl = document.querySelector('.temp');
    if (tempEl) tempEl.textContent = Math.round(data.main.temp) + ' °C';
    const windEl = document.querySelector('.wind');
    if (windEl) windEl.textContent = data.wind.speed + ' km/hr';
    const humidityEl = document.querySelector('.humidity');
    if (humidityEl) humidityEl.textContent = data.main.humidity + ' %';

    const icons = {
      "Clouds": "cloud.jpeg",
      "Rain": "rain.png",
      "Clear": "sun.webp",
      "Drizzle": "drizzle.jpeg",
      "Mist": "mist.jpeg",
      "Snow": "snow.png",
      "Thunderstorm": "thunder.png"
    };
    if (weatherIcon) weatherIcon.src = icons[weatherMain] || "sun.webp";

    const bgMap = {
      "Clouds": "cloudy.jpeg",
      "Rain": "rainy.png",
      "Clear": "sunny.jpeg",      // <- changed from sunny.webp to sunny.jpeg (match your file)
      "Drizzle": "rainy.jpg",
      "Mist": "winter.png",
      "Snow": "snow.png",
      "Thunderstorm": "storm.jpg"
    };
    const bgSrc = bgMap[weatherMain] || "winter.png";
    setBackgroundImage(bgSrc);

  } catch (err) {
    console.error(err);
    alert('Network error');
  }
}

searchButton.addEventListener('click', ()=>{
  checkWeather(searchBox.value.trim());
});

searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    checkWeather(searchBox.value.trim());
  }
});
