// /* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

// // mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

// // var map = new mapboxgl.Map({
// //   container: 'map',
// //   style: 'mapbox://styles/mapbox/streets-v11',
// // });

// // Initialize the map
// // const map = L.map('map').setView(
// //   [tour.startLocation.coordinates[1], tour.startLocation.coordinates[0]],
// //   10,
// // );

// // // Add a tile layer (OpenStreetMap in this case)
// // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //   attribution:
// //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// // }).addTo(map);

// // // Add markers for each location
// // const locations = JSON.parse(document.getElementById('map').dataset.locations);
// // locations.forEach((loc) => {
// //   L.marker([loc.coordinates[1], loc.coordinates[0]])
// //     .addTo(map)
// //     .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`);
// // });

// document.addEventListener('DOMContentLoaded', function () {
//   const mapElement = document.getElementById('map');
//   const locations = JSON.parse(mapElement.dataset.locations);

//   // Initialize the map
//   const map = L.map('map').setView([52.4797, -1.90269], 6); // Center at initial coordinates

//   // Add a tile layer (OpenStreetMap in this case)
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }).addTo(map);

//   // Add markers for each location
//   locations.forEach((item) => {
//     const marker = L.marker([item.coordinates[1], item.coordinates[0]]).addTo(
//       map,
//     );

//     // Create popup content
//     const popupContent = `
//         <div class="popupContainer">
//           <img src="/img/tours/${item.imageCover}" alt="${item.description}" />
//           <div class="textContainer">
//             <a href="/tours/${item.id}">${item.description}</a>
//             <span class="bed">${item.day} day</span>
//             <b>${item.price}</b>
//           </div>
//         </div>
//       `;

//     // Bind popup to marker
//     marker.bindPopup(popupContent);
//   });
// });
