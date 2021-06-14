
import chai from 'chai';
const expect = chai.expect;

import sampleCustomers from '../sampleData/sampleCustomers';
import sampleBookings from '../sampleData/sampleBookings';
import sampleRooms from '../sampleData/sampleRooms';

import Hotel from '../src/Hotel';

describe("Hotel", () => {
  let hotel1, booking1, booking2, room1, room2, room3 , room4, room5, room6, room7, room8, totalBooking, date, type, type2

  beforeEach(() => {
    hotel1 = new Hotel(sampleCustomers, sampleRooms, sampleBookings)
    booking1 = sampleBookings[0]
    booking2 = sampleBookings[1]
    totalBooking = [booking1, booking2]
    room1 = sampleRooms[0]
    room2 = sampleRooms[1]
    room3 = sampleRooms[2]
    room4 = sampleRooms[3]
    room5 = sampleRooms[4]
    room6 = sampleRooms[5]
    room7 = sampleRooms[6]
    room8 = sampleRooms[7]
    date = "2020/10/09"
    type = "junior suite"
    type2 = "single room"
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

 it('should find the rooms that are booked', () => {
   hotel1.findBookedRoomNumber(date)
   expect(hotel1.findBookedRoomNumber(date)).to.deep.equal([1])
 });

 it('should find rooms that are available', () => {
   hotel1.findBookedRoomNumber(date)
   hotel1.findAvailableRooms(date)
   expect(hotel1.availableRooms).to.deep.equal([room2, room3, room4, room5, room6, room7, room8])
 });

 it('should filter rooms by type', () => {
   hotel1.filterRoomsByType(type)
   hotel1.filterRoomsByType(type2)
   expect(hotel1.filterRoomsByType(type)).to.deep.equal([room6, room8])
   expect(hotel1.filterRoomsByType(type2)).to.deep.equal([room3, room4, room5, room7])
 });
});
