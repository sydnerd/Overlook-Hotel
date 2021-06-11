class Hotel{
  constructor(customerData, roomData, bookingData) {
    this.customers = customerData;
    this.rooms = roomData;
    this.bookings = bookingData;
    this.roomType = bookingData.roomType;
    this.available = true;
  }
  checkAvailability() {

  }
  filterByRoomType() {

  }
}

export default Hotel;
