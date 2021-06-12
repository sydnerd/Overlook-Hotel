class Hotel{
  constructor(customerData, roomData, bookingData) {
    this.customers = customerData;
    this.rooms = roomData;
    this.bookings = bookingData;
    this.roomType = bookingData.roomType;
    this.available = true;
    this.availablelRooms = []
  }

  findBookedRooms(date) {
     const bookedRoom = this.bookings.filter(booking => date === booking.date)
     return bookedRoom.map(room => room.roomNumber)
  }

  findAvailableRooms() {

  }

  filterByRoomType() {

  }
}

export default Hotel;
