const fetchAllData = () => {
  const promises = [getCustomerData(), getRoomsData(), getBookingsData()]
  return Promise.all(promises)
    .catch(error => console.log("ERROR"))
}

const getCustomerData = () => {
  return fetch('https://overlook-hotel-api.herokuapp.com/api/v1/customers')
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}


const getRoomsData = () => {
  return fetch('https://overlook-hotel-api.herokuapp.com/api/v1/rooms')
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}


const getBookingsData = () => {
  return fetch('https://overlook-hotel-api.herokuapp.com/api/v1/bookings')
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}

const postBooking = (booking) => {
  const initObj = {
    userID: booking.id,
    date: booking.date,
    roomNumber: booking.roomNumber
  }
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(initObj)
  }
  return fetch('https://overlook-hotel-api.herokuapp.com/api/v1/bookings/', init)
    .then(response => checkForErr(response))
    .then(data => data)
    .catch(err => displayBookingError())
}

const checkForErr = (response) => {
  console.log(response)
  if(!response.ok) {
    throw new Error('Something went wrong')
  } else {
    displaySuccess()
    return response.json();
  }
}

const displayBookingError = () => {
  errorMsg.innerText = "Something went wrong. Please try again."
  setTimeout(() => errorMsg.innerText = "", 2000)
}

const displaySuccess = () => {
  errorMsg.innerText = "You have booked sucessfully!"
  setTimeout(() => errorMsg.innerText = "", 2000)
}

export {
  fetchAllData,
  postBooking,
  getBookingsData
}
