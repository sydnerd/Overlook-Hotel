// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import {fetchAllData} from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/img1.jpg'
import './images/img2.jpg'
import './images/img3.jpg'
import './images/img4.jpg'
import './images/img5.jpg'
import './images/img6.jpg'

//Variables

//Event Listeners
window.addEventListener("load", getData)

//WINDOW LOAD FUNCTION
function getData() {
  fetchAllData()
    .then(data => console.log(data))
}
