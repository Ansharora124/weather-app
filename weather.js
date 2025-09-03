const apiKey ="f223f88d2a3f64bf71ddcc2331608e1c";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=delhi";

async function checkWeather() {
  const response =await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);
  
document.querySelector('.city').innerHTML=data.name;
document.querySelector('.temp').innerHTML=Math.round(data.main.temp) + ' °C';
document.querySelector('.wind').innerHTML=data.wind.speed + ' km/hr';
document.querySelector('.humidity').innerHTML=data.main.humidity + ' %';


}
checkWeather();
