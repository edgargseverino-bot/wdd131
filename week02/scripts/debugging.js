const radiusOutput = document.getElementById('radius');
const areaOutput = document.getElementById('area');

let area = 0;
const PI =  3.14159;

let radius = 10;
area = PI * radius * 2;
radiusOutput.textContent = radius;
areaOutput.textContent = area;