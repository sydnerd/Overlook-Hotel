// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import { fetchAllData } from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/img1.jpg'
import './images/img2.jpg'
import './images/img3.jpg'
import './images/img4.jpg'
import './images/img5.jpg'
import './images/img6.jpg'
import domUpdates from './dom-updates'
import Customer from './Customer'
import Hotel from './Hotel'

//Global Variables
let customers = [];
let bookings = [];
let rooms = [];

//Query Selectors
const totalCost = document.getElementById('totalCost');
const bookRoomButton = document.getElementById('bookRoom')
const bookRoomSection = document.getElementById('bookRoomSection')
const imageContainer = document.getElementById('imageContainer')
//Event Listeners
window.addEventListener('load', loadData)
bookRoomButton.addEventListener('click', displayBookRoomSection)

//WINDOW LOAD FUNCTION
function loadData() {
  fetchAllData()
    .then(function(data) {
      fillCustomers(data[0])
      fillBookings(data[2])
      fillRooms(data[1])
    })
}

//Functions
function fillCustomers(customerData) {
  customerData.customers.forEach(customer => customers.push(customer))
}

function fillBookings(bookingsData) {
  console.log(bookingsData)
  bookingsData.bookings.forEach(booking => bookings.push(booking))
}

function fillRooms(roomData) {
  roomData.rooms.forEach(room => rooms.push(room))
}

function displayBookRoomSection() {
  imageContainer.classList.add('hidden')
  bookRoomSection.classList.remove('hidden')
}
