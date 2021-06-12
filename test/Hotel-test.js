import chai from 'chai';
const expect = chai.expect;

import sampleCustomers from '../sampleData/sampleCustomers';
import sampleBookings from '../sampleData/sampleBookings';
import sampleRooms from '../sampleData/sampleRooms';

import Hotel from '../src/Hotel';

describe.only("Hotel", () => {
  let hotel1, booking1, booking2, room1, room2, totalBooking

  beforeEach(() => {
    hotel1 = new Hotel(sampleCustomers, sampleRooms, sampleBookings)
    booking1 = sampleBookings[0]
    booking2 = sampleBookings[1]
    totalBooking = [booking1, booking2]
    room1 = sampleRooms[0]
    room2 = sampleRooms[1]
  });

it('should be a function', () => {
   expect(Hotel).to.be.a('function');
 });

 it('should be an instance of Hotel', () => {
   expect(hotel1).to.be.an.instanceof(Hotel);
 });

 it('should have an customers', () => {
   expect(hotel1.customers).to.eql(sampleCustomers);
 });

 it('should have rooms', () => {
   expect(hotel1.rooms).to.eql(sampleRooms);
 });

 it('should have bookings', () => {
   expect(hotel1.bookings).to.eql(sampleBookings);
 });

 it('should have a room type', () => {
   expect(hotel1.roomType).to.eql(sampleBookings.roomType);
 });

 it('should get all bookings for the customer, past, present, and upcoming', () => {
   customer1.getAllBookings(sampleBookings)
   expect(customer1.bookings).to.eql(totalBooking)
   expect(customer1.bookings.length).to.eql(2)
   expect(customer1.bookings.length).to.not.equal(3)
 });
 //
 // it('should get total dollar amount for all bookings', () => {
 //   customer1.getAllBookings(sampleBookings)
 //   expect(customer1.getTotalCost(sampleRooms)).to.eql(835.78)
 // });
})
