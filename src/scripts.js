// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import {
  fetchAllData
} from './apiCalls';
import dayjs from 'dayjs';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/img1.jpg'
import './images/img2.jpg'
import './images/img3.jpg'
import './images/img4.jpg'
import './images/img5.jpg'
import './images/img6.jpg'
import './images/img7.jpg'
import domUpdates from './dom-updates'
import Customer from './Customer'
import Hotel from './Hotel'

//Global Variables
let customers = [];
let bookings = [];
let rooms = [];
let currentCustomer;

//Query Selectors
const totalCost = document.getElementById('totalCost');
const bookRoomButton = document.getElementById('bookRoom');
const bookRoomSection = document.getElementById('bookRoomSection');
const imageContainer = document.getElementById('imageContainer');
const dashboard = document.getElementById('dashboard');
const main = document.getElementById('main');
const nav = document.getElementById('nav');
const login = document.getElementById('login');
const loginError = document.getElementById('loginErr');
const passwordInput = document.getElementById('passwordInput');
const usernameInput = document.getElementById('usernameInput');
const loginSubmit = document.getElementById('loginFormSubmit');
const welcomeText = document.getElementById('welcomeText');
const pastStays = document.getElementById('pastStays')
const pastStaysSection =document.getElementById('pastStaysSection')
//Event Listeners
window.addEventListener('load', loadData)
bookRoomButton.addEventListener('click', displayBookRoomSection)
dashboard.addEventListener('click', displayHome)
loginFormSubmit.addEventListener('click', (event) => {
  validateUser(event)
})
pastStays.addEventListener('click', displayPastBookings)

//WINDOW LOAD FUNCTION
function loadData() {
  fetchAllData()
    .then(function(data) {
      fillCustomers(data[0])
      fillBookings(data[2])
      fillRooms(data[1])
    })
  showLogin()
}

//Functions
function fillCustomers(customerData) {
  customerData.customers.forEach(customer => customers.push(customer))
}

function fillBookings(bookingsData) {
  bookingsData.bookings.forEach(booking => bookings.push(booking))
}

function fillRooms(roomData) {
  roomData.rooms.forEach(room => rooms.push(room))
}

function displayBookRoomSection() {
  imageContainer.classList.add('hidden')
  bookRoomSection.classList.remove('hidden')
  pastStaysSection.classList.add('hidden')
}

function displayHome() {
  imageContainer.classList.remove('hidden')
  bookRoomSection.classList.add('hidden')
}

function showLogin() {
  nav.classList.add('hidden')
  main.classList.add('hidden')
  login.classList.remove('hidden')
}

function loadMain() {
  login.classList.add('hidden')
  main.classList.remove('hidden')
  nav.classList.remove('hidden')
  findCurrentCustomer()
}

function findCurrentCustomer() {
  let loginInfo = usernameInput.value.split('r');
  return customers.find(customer => {
    if(customer.id === parseInt(loginInfo[1])){
      currentCustomer = new Customer(customers[parseInt(loginInfo[1])-1])
      updateUserWelcome()
      displayTotalCost()
    }
  })
}

function updateUserWelcome() {
  welcomeText.innerText = `WELCOME: ${currentCustomer.name}`
}

function validateUser(event) {
  event.preventDefault()
  let loginInfo = usernameInput.value.split('r');
  if (parseInt(loginInfo[1]) > 0 && parseInt(loginInfo[1]) < 51 && passwordInput.value === 'overlook2021') {
    loadMain()
  } else {
    loginError.classList.remove('hidden')
    clearForm(usernameInput, passwordInput);
  }
}

function clearForm(usernameInput, passwordInput) {
  usernameInput.value = '';
  passwordInput.value = '';
}

function displayTotalCost() {
  currentCustomer.getAllBookings(bookings)
  totalCost.innerText = `$ ${currentCustomer.getTotalCost(rooms)}`
  console.log(currentCustomer.bookings)
}

function displayPastBookings(bookings, rooms) {
  currentCustomer.bookings.map(booking => {
        pastStaysSection.innerHTML += `
          <article class="past-stays-card">
          <h4>Date: ${booking.date}</h4>
          <p>Room number: ${booking.roomNumber}</p>
          <img class="hotel-image" src="../images/img6.jpg" alt="Room image">
          </article>
        `
    })
  imageContainer.classList.add('hidden')
  bookRoomSection.classList.add('hidden')
  console.log("current customer",currentCustomer)
}
