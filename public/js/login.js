/* eslint-disable */

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

// /* eslint-disable */

// Ensure axios is loaded from CDN in HTML, no need to import or require it here

// const login = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/api/v1/users/login',
//       data: {
//         email,
//         password,
//       },
//     });
//     console.log(res);
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('.form');
//   if (form) {
//     form.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const email = document.getElementById('email').value;
//       const password = document.getElementById('password').value;
//       login(email, password);
//     });
//   } else {
//     console.error('Form element not found.');
//   }
// });
