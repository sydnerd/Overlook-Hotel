import chai from 'chai';
const expect = chai.expect;

import sampleCustomers from '../sampleData/sampleCustomers';
import sampleBookings from '../sampleData/sampleBookings';
import sampleRooms from '../sampleData/sampleRooms';

import Customer from '../src/Customer';
import Hotel from '../src/Hotel';

describe("Customer", () => {
  let customer1, customer2, booking1, booking2, room1, room2, totalBooking

  beforeEach(() => {
    customer1 = new Customer(sampleCustomers[0])
    customer2 = new Customer(sampleCustomers[1])
    booking1 = sampleBookings[0]
    booking2 = sampleBookings[1]
    totalBooking = [booking1, booking2]
    room1 = sampleRooms[0]
    room2 = sampleRooms[1]
  });

  it('should be a function', () => {
   expect(Customer).to.be.a('function');
 });

 it('should be an instance of Customer', () => {
   expect(customer1).to.be.an.instanceof(Customer);
 });

 it('should have an id', () => {
   expect(customer1.id).to.eql(1);
   expect(customer2.id).to.eql(2);
   expect(customer1.id).to.not.equal(3);
 });

 it('should have a name', () => {
   expect(customer1.name).to.eql('Sydney Bear');
   expect(customer2.name).to.eql('Rebecca Phillips');
   expect(customer1.name).to.not.equal('Nicole Zagorski');
 });

 it('should get all bookings for the customer, past, present, and upcoming', () => {
   customer1.getAllBookings(sampleBookings)
   expect(customer1.bookings).to.eql(totalBooking)
   expect(customer1.bookings.length).to.eql(2)
   expect(customer1.bookings.length).to.not.equal(3)
 });

 it('should get total dollar amount for all bookings', () => {
   customer1.getAllBookings(sampleBookings)
   expect(customer1.getTotalCost(sampleRooms)).to.eql(835.78)
 });

})
