class Hotel{
  constructor(customerData, roomData, bookingData) {
    this.customers = customerData;
    this.rooms = roomData;
    this.bookings = bookingData;
    this.roomType = bookingData.roomType;
    this.available = true;
    this.availableRooms = []
    this.availableRoomsByType = []
  }

  findBookedRoomNumber(date) {
     const bookedRoom = this.bookings.filter(booking => date === booking.date)
     return bookedRoom.map(room => room.roomNumber)
  }

  findAvailableRooms(date) {
    const bookedRooms = this.findBookedRoomNumber(date)
    console.log("booked", bookedRooms)
    const filteredRooms = this.rooms.filter(room => {
      bookedRooms.forEach(roomNumber => {
        if(roomNumber !== room.number) {
          this.availableRooms.push(room)
        }
      })
    })
    console.log("avail",this.availableRooms)
    return filteredRooms
  }

  filterRoomsByType(type) {
    return this.rooms.filter(room => room.roomType === type)
  }
}

export default Hotel;
