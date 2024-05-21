// Import dependencies
import "regenerator-runtime/runtime"; // Polyfill untuk async/await
import "../styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const restaurantListContainer = document.getElementById("restaurantList");

  const baseUrl = "https://restaurant-api.dicoding.dev/list";
  // Fungsi untuk mengambil data restoran dari API
  async function fetchRestaurantsData() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data.restaurants;
  }

  // Fungsi untuk membuat kartu HTML untuk restoran
  function createRestaurantCard(restaurant) {
    // Memotong deskripsi menjadi maksimal 10 kata
    const trimmedDescription =
      restaurant.description.split(" ").slice(0, 10).join(" ") +
      (restaurant.description.split(" ").length > 10 ? "..." : "");

    return `
      <div class="card">
        <img src="https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}" alt="Gambar Kartu" />
        <div class="card-content">
          <h3 class="card-title">${restaurant.name}</h3>
          <p class="card-description">${trimmedDescription}</p>
          <p class="card-city">Kota: ${restaurant.city}</p>
          <div class="card-rating">Rating: ${restaurant.rating}</div>
          <a href="../templates/detail.html?id=${restaurant.id}">Detail</a>
        </div>
      </div>
    `;
  }

  // Fungsi untuk menampilkan kartu restoran di UI
  function displayRestaurants(restaurants) {
    const restaurantCards = restaurants.map(createRestaurantCard);
    restaurantListContainer.innerHTML = restaurantCards.join("");
  }

  // Fungsi utama untuk mengambil data restoran dan menampilkannya
  async function fetchAndDisplayRestaurants() {
    try {
      const restaurants = await fetchRestaurantsData();
      displayRestaurants(restaurants);
    } catch (error) {
      console.error("Kesalahan saat mengambil data restoran:", error);
    }
  }

  // Panggil fungsi utama saat DOM sepenuhnya dimuat
  fetchAndDisplayRestaurants();
});
