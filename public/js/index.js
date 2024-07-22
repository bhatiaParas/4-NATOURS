/* eslint-disable */

import '@babel/polyfill';
import { login } from './login';

const loginForm = document.querySelector('.form');

//Map

if (loginForm) {
  loginForm.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
