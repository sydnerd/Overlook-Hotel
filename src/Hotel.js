class Hotel {
  constructor(customerData, roomData, bookingData) {
    this.customers = customerData;
    this.rooms = roomData;
    this.bookings = bookingData;
    this.roomType = bookingData.roomType;
    this.availableRooms = []
  }

  findBookedRoomNumber(date) {
    const bookedRoom = this.bookings.filter(booking => date === booking.date)
    return bookedRoom.map(room => room.roomNumber)
  }

  findAvailableRooms(date) {
    this.availableRooms = []
    const bookedRooms = this.findBookedRoomNumber(date)
    this.availableRooms = this.rooms.filter(room => !bookedRooms.includes(room.number))
  }

  filterRoomsByType(type) {
    if (type === 'all rooms') {
      return this.availableRooms
    }
    return this.availableRooms.filter(room => room.roomType === type)
  }
}

export default Hotel;
