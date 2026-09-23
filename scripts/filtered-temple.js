


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


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
];


let templeHTML ='';
temples.forEach((temple) => {
	
	templeHTML +=`
	
		<figure class="portrait">
			<h2 class="description">${temple.templeName}</h2>
			<p>Location: ${temple.location}</p>
			<p>Dedicated: ${temple.dedicated}</p>
			<P>Area: ${temple.area} sq ft</p>
			<img src="${temple.imageUrl}" alt="${temple.templeName}">
		</figure> 
	
	`
});
let temple_array = [];
const temple_selection = document.getElementById('temples');
temple_selection.innerHTML = templeHTML;
const large_area = document.getElementById('large-temple');
const nav = document.querySelector('.navigation');
function updloading_temple(array){
	nav.addEventListener('click',(event) =>{
		if (event.target.id === 'old-temple') {
			temple_array = array.filter(element => element.dedicated.slice(0,4) < 1900);

		} else if (event.target.id === 'new-temple') {
			temple_array = array.filter(element => element.dedicated.slice(0,4) > 2000);
		
		} else if (event.target.id === 'short-temple') {
			temple_array = array.filter(element => element.area < 10000);
		} else if (event.target.id === 'large-temple') {
			temple_array = array.filter(element => element.area > 90000);
		}
		templeHTML = '';
		temple_array.forEach((choice) => {
			templeHTML += `
					<figure class="portrait">
						<h2 class="description">${choice.templeName}</h2>
						<p>Location: ${choice.location}</p>
						<p>Dedicated: ${choice.dedicated}</p>
						<p>Area: ${choice.area} sq ft</p>
						<img src="${choice.imageUrl}" alt="${choice.templeName}">
					</figure>
				`;
		});
		temple_selection.innerHTML = templeHTML;
	});
}
updloading_temple(temples);	