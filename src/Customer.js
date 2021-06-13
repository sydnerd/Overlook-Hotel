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
    return totalCost.toFixed(2)
  }
}

export default Customer;
