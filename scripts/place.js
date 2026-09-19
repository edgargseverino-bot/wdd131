const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").innerHTML = document.lastModified;

// Weather section

const windChill = document.getElementById('windChill');
const temperature_data= 15;
const wind_speed= 5;

document.getElementById('temperature').innerHTML = temperature_data;
document.getElementById('wind').innerHTML = wind_speed;

if(temperature_data <= 10 && wind_speed > 4.8){
    windChill.innerHTML = calculateWindChill(temperature_data, wind_speed)
}
else{
    windChill.innerHTML = NaN;
}

function calculateWindChill(temperature, windSpeed){
    return 13.12 + 0,6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)
}