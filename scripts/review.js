const reviewCount = Number(localStorage.getItem("reviews")) || 0;

document.querySelector('#review-count').textContent = reviewCount;