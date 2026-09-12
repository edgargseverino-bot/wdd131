


const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").innerHTML = document.lastModified;



const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');
const heading = document.querySelector('.heading');

hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
    heading.classList.toggle('show');
});
