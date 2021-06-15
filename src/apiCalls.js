

const fetchAllData = () => {
    const promises = [getCustomerData(), getRoomsData(), getBookingsData()]
    return Promise.all(promises)
        .catch(error => console.log("ERROR"))
}

const getCustomerData = () => {
  return fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}


const getRoomsData = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}


const getBookingsData = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .catch(err => console.log("ERROR"))
}

// const postBooking = (booking) => {
//   const initObj = { "userID": booking.id, "date": booking.date, "roomNumber": booking.roomNumber }
//   const init = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(initObj)
//   }
//   return fetch(http:localhost:3001/api/v1/bookings, init)
//   .then(response => response.json())
//   .catch(err => console.log(err.message))
// }


export {
  fetchAllData
}
