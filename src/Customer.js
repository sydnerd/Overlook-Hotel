class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
  }

  getAllBookings(bookingData) {
    this.bookings = bookingData.filter(booking => booking.userID === this.id)
  }

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
