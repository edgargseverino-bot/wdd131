const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }]

const selectOption= document.getElementById("product");
let productHTML = '';

products.forEach((product) =>{
    productHTML += `
      
        <option id ="${product.id}" value="${product.name}">${product.name}</option>

    `
});

selectOption.innerHTML += productHTML;


const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").innerHTML = document.lastModified;


let reviews = localStorage.getItem("reviews");
console.log(reviews);

let reviewCount = Number(localStorage.getItem('reviews'));
  if(reviewCount === 0){
    reviewCount = 1;
  }
  else{
    reviewCount +=1;
  }
  localStorage.setItem("reviews", reviewCount);



