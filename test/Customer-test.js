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

})
