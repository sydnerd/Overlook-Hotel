class Hotel{
  constructor(customerData, roomData, bookingData) {
    this.customers = customerData;
    this.rooms = roomData;
    this.bookings = bookingData;
    this.roomType = bookingData.roomType;
    this.available = true;
    this.availablelRooms = []
  }

  determineBookedRooms(date) {
     const bookedRoom = this.bookings.filter(booking => date === booking.date)
     return bookedRoom.map(room => room.roomNumber)
     this.available = false
  }

  checkAvailability() {

  }

  filterByRoomType() {

  }
}

export default Hotel;
