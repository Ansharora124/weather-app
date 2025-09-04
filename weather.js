const apiKey ="f223f88d2a3f64bf71ddcc2331608e1c";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector('.search input');
const searchButton=document.querySelector('.search button');
const weatherIcon=document.querySelector('.image img');


async function checkWeather(city) {
  const response =await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);
  

document.querySelector('.season').innerHTML=data.weather.main;
document.querySelector('.city').innerHTML=data.name;
document.querySelector('.temp').innerHTML=Math.round(data.main.temp) + ' °C';
document.querySelector('.wind').innerHTML=data.wind.speed + ' km/hr';
document.querySelector('.humidity').innerHTML=data.main.humidity + ' %';

if(data.weather[0].main=="Clouds"){
  weatherIcon.src="cloud.jpeg";
}
else if(data.weather[0].main=="Rain"){
weatherIcon.src="rain.png";
}
else if(data.weather[0].main=="Clear"){
weatherIcon.src="sun.webp";
}
else if(data.weather[0].main== "Drizzle"){
  weatherIcon.src="drizzle.jpeg";

}
else if(data.weather[0].main=="Mist")
{
  weatherIcon.scr="mist.jpeg";
}
}
searchButton.addEventListener('click', ()=>{
checkWeather(searchBox.value);
});

