// URL API
const baseURL = "https://restaurant-api.dicoding.dev";

// Fungsi untuk mengambil data dari API
async function fetchData(url) {
  const response = await fetch(baseURL + url);
  const data = await response.json();
  return data;
}

// Fungsi untuk menampilkan detail restoran
function displayRestaurantDetail(data) {
  const detailContainer = document.getElementById("detail");
  const restaurant = data.restaurant;
  detailContainer.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p>${restaurant.description}</p>
        <p>${restaurant.city}</p>
        <p>Rating: ${restaurant.rating}</p>
        <p>Address: ${restaurant.address}</p>
        <p>Categories: ${restaurant.categories
          .map((category) => category.name)
          .join(", ")}</p>
        <p>Foods: ${restaurant.menus.foods
          .map((food) => food.name)
          .join(", ")}</p>
        <p>Drinks: ${restaurant.menus.drinks
          .map((drink) => drink.name)
          .join(", ")}</p>
        <p>Reviews: ${restaurant.customerReviews
          .map((review) => `${review.name}: ${review.review}`)
          .join(", ")}</p>
    `;
}

// Mengambil id restoran dari URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Mengambil dan menampilkan detail restoran
fetchData(`/detail/${id}`).then((data) => displayRestaurantDetail(data));
