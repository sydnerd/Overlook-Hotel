import chai from 'chai';
const expect = chai.expect;

import sampleCustomers from '../sampleData/sampleCustomers'


import Customer from '../src/Customer';

describe("Customer", () => {
  let customer1, customer2
  beforeEach(() => {
    customer1 = new Customer(sampleCustomers[0])
    customer2 = new Customer(sampleCustomers[1])
  });

  it('should be a function', () => {
   expect(Customer).to.be.a('function');
 });

 it('should be an instance of Customer', () => {
   expect(customer1).to.be.an.instanceof(Customer);
 });

})
