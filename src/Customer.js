class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
    this.totalCost = 0;
  }

  getAllBookings(bookingData) {
    this.bookings = bookingData.filter(booking => booking.userID === this.id)
  }
//filter through the booking data.
//If the user id matches the booking userid, then take the room number
//then filter through the rooms data.
//if the room matches then add the booking to this.bookings array

getTotalCost(roomData) {
  const totalCost = roomData.reduce((sum, room) => {
    this.bookings.forEach(booking => {
      if (room.number === booking.roomNumber) {
        sum += room.costPerNight;
      }
    })
    return sum
  }, 0)
  return totalCost;
}
}
  // getTotalCost(roomsData) {
  //   let totalSpent = 0
  //     this.bookings.forEach(booking => {
  //     let foundRoom = roomsData.find(room => room.number === booking.roomNumber);
  //     totalSpent += foundRoom.costPerNight;
  //   });
  //   return totalSpent.toFixed(2);
  // };
// }

export default Customer;
