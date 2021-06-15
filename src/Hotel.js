class Hotel{
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
    const bookedRooms = this.findBookedRoomNumber(date)
    console.log(bookedRooms)
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
    if(type === 'all rooms'){
       return this.availableRooms
    }
      return this.availableRooms.filter(room => room.roomType === type)
  }
}

export default Hotel;
