import request from 'supertest';
import bluebird from 'bluebird';
import server from '../server';
import Contact from '../server/models/contact';

const agent = request(server);

describe('list contacts', () => {
  const contacts = [
    new Contact({
      number: '1',
      street: 'rue des Chats',
      city: 'Chatville',
      postcode: '11111',
      firstname: 'René',
      lastname: 'Dupont',
      lat: 6,
      lng: 7,
    }),

    new Contact({
      number: '5',
      street: 'rue des Ponts',
      city: 'Pontville',
      postcode: '22222',
      firstname: 'André',
      lastname: 'Renard',
      lat: 12,
      lng: 8,
    }),

    new Contact({
      number: '8',
      street: 'avenue du Test',
      city: 'Testville',
      postcode: '333333',
      firstname: 'Martin',
      lastname: 'Marcel',
      lat: 40,
      lng: 56,
    }),
  ];

  before(done => {
    bluebird
      .map(contacts, contact => contact.save(), { concurrency: 1 })
      .asCallback(done);
  });

  after(done => {
    bluebird
      .map(contacts, contact => Contact.remove({ _id: contact._id }))
      .asCallback(done);
  })

  it('returns a list of users', done => {
    agent
      .get('/api/contacts')
      .expect(res => {
        expect(res.body[0].number).to.equal(8);
        expect(res.body[0].firstname).to.equal('Martin');
        expect(res.body[0].city).to.equal('Testville');
      })
      .end(done);
  });
});
