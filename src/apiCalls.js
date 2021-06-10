

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

export {
  fetchAllData
}
