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
const pastStays = document.getElementById('pastStays');
const pastStaysSection = document.getElementById('pastStaysSection');
const calendar = document.getElementById('calendar');
const bookingError = document.getElementById('bookingError');
const checkAvailabilityButton = document.getElementById('checkAvailabilityButton');
const availableRoomCards = document.getElementById('availableRoomCards');
const selectRoomType = document.getElementById('roomTypeForm');
const calendarSection = document.getElementById('calendarSection')

//Event Listeners
window.addEventListener('load', loadData)
bookRoomButton.addEventListener('click', displayBookRoomSection)
dashboard.addEventListener('click', displayHome)
loginFormSubmit.addEventListener('click', (event) => {
  validateUser(event)
})
pastStays.addEventListener('click', displayPastBookings)
checkAvailabilityButton.addEventListener('click', checkRoomsAvailable)
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
  calendar.value = dayjs().format('YYYY-MM-DD')
  calendar.setAttribute('min', calendar.value)
  selectRoomType.classList.add('hidden')
  calendarSection.classList.remove('hidden')
}

function displayHome() {
  imageContainer.classList.remove('hidden')
  bookRoomSection.classList.add('hidden')
  pastStaysSection.classList.add('hidden')
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
    if (customer.id === parseInt(loginInfo[1])) {
      currentCustomer = new Customer(customers[parseInt(loginInfo[1]) - 1])
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
}

function displayPastBookings(bookings) {
  pastStaysSection.classList.remove('hidden')
  currentCustomer.bookings.map(booking => {
    pastStaysSection.innerHTML += `
          <article class="past-stays-card">
          <p>Date: ${booking.date}</p>
          <p>Room number: ${booking.roomNumber}</p>
          <img class="hotel-image" src="../images/img6.jpg" alt="Room image">
          </article>
        `
  })
  imageContainer.classList.add('hidden')
  bookRoomSection.classList.add('hidden')
}

// function bookRoom() {
//
// }

function checkRoomsAvailable() {
  let hotel = new Hotel(customers, rooms, bookings)
  const dateSelected = dayjs(calendar.value).format('YYYY/MM/DD')
  const availableRooms = hotel.findAvailableRooms(dateSelected)
  if (hotel.availableRooms.length === 0) {
    bookingError.classList.remove('hidden')
  } else {
    hotel.availableRooms.map(room => {
      availableRoomCards.innerHTML += `
        <article class="available-room-card">
        <button class="book-now-button">Book now</button>
        <p class="detail-text">Room number: ${availableRooms.number}</p>
        <p class="detail-text">Room type: ${availableRooms.roomType}</p>
        <p class="detail-text">Bidet: ${availableRooms.bidet}</p>
        <p class="detail-text">Bed size: ${availableRooms.bedSize}</p>
        <p class="detail-text">Number of beds: ${availableRooms.numBeds}</p>
        <p class="detail-text">Cost per night: ${availableRooms.costPerNight}</p>
        <img class="hotel-image" src="../images/img6.jpg" alt="Room image">
        </article>
      `
    })
    selectRoomType.classList.remove('hidden')
    calendarSection.classList.add('hidden')
  }
}

// function displayRoomsAvailable(availableRooms) {
//   console.log("hotel available rooms", hotel.availableRooms)
//     availableRooms.map(room => {
//       availableRoomCards.innerHTML += `
//         <article class="available-room-card">
//         <button>Book now</button>
//         <p>Room number: ${hotel.availableRooms.number}</p>
//         <p>Room type: ${hotel.availableRooms.roomType}</p>
//         <p>Bidet: ${hotel.availableRooms.bidet}</p>
//         <p>Bed size: ${hotel.availableRooms.bedSize}</p>
//         <p>Number of beds: ${hotel.availableRooms.numBeds}</p>
//         <p>Cost per night: ${hotel.availableRooms.costPerNight}</p>
//         <img class="hotel-image" src="../images/img6.jpg" alt="Room image">
//         </article>
//       `
//     })
  //   selectRoomType.classList.remove('hidden')
  //   calendarSection.classList.add('hidden')
  //   console.log("are you working?")
  // }
