class Customer {
  constructor(customerData, roomData) {
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
  getTotalCost() {

  }
}

export default Customer;
