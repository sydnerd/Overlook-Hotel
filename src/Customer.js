class Customer {
  constructor(customerData) {
    this.id = customerData.id
    this.name = customerData.name;
    this.bookings = [];
    this.totalCost = 0;
  }
}

export default Customer;
