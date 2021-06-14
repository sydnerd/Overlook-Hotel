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
    const filteredRooms = this.rooms.filter(room => {
      if(bookedRooms.length === 0){
        this.availableRooms.push(room)
      } else{
        bookedRooms.forEach(roomNumber => {
          if(roomNumber !== room.number) {
            this.availableRooms.push(room)
          }
      })
    }
    })
    return filteredRooms
  }

  filterRoomsByType(type) {
    return this.rooms.filter(room => room.roomType === type)
  }
}

export default Hotel;
