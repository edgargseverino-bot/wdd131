const temples = [
    { name: 'Roma temple', description: 'Roma, Italy', image: 'images/temples/roma_italy.webp'},
    { name: 'Salt Lake temple', description: 'Salt Lake,US', image: 'images/temples/salt_lake.webp'},
    { name: 'Salt Lake Temple', description: 'Salt Lake,US', image: 'images/temples/salt_lake.webp'},
    { name: 'Salt Lake temple', description: 'Salt Lake,US', image: 'images/temples/salt_lake.webp'},
    { name: 'Salt Lake temple', description: 'Salt Lake,US', image: 'images/temples/salt_lake.webp'},
    { name: 'Salt Lake temple', description: 'Salt Lake,US', image: 'images/temples/salt_lake.webp'},
    { name: 'Salt Lake temple', description: 'Salt Lake,US', image: 'images/temples/salt_lake.webp'},
    { name: 'Sant. domingo temple', description: 'Santo Domingo, DR', image: 'images/temples/santo_domingo_dr.webp'},
    {name: 'Washington dc temple', description: 'Whashington DC, US', image:'images/temples/washington_dc.webp'}
]


const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").innerHTML = document.lastModified;

const temple_section = document.getElementById('temples');


let templeHTML = '';

temples.forEach((temple)=>{
    templeHTML += `
        <figure class="portrait">
            <img src="${temple.image}" alt="${temple.description}">
            <figcaption class="description">${temple.name}</figcaption>
        </figure>
    `
});

temple_section.innerHTML = templeHTML;

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');
const heading = document.querySelector('.heading');

hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
    heading.classList.toggle('show');
});
