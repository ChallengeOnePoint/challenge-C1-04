import request from 'supertest';
import bluebird from 'bluebird';
import server from '../server';
import Contact from '../server/models/contact';

const agent = request(server);

describe('update a contact', () => {
  const contact = new Contact({
    number: '1',
    street: 'rue des Chats',
    city: 'Chatville',
    postcode: '11111',
    firstname: 'René',
    lastname: 'Dupont',
    lat: 6,
    lng: 7,
  });

  before(done => {
    contact.save().asCallback(done);
  });

  after(done => {
    contact.remove().asCallback(done);
  });

  it('allows field updates', done => {
    agent
      .put(`/api/contacts/${contact._id}`)
      .send({ street: 'rue des Ours' })
      .expect(res => {
        expect(res.body.number).to.equal('1');
        expect(res.body.firstname).to.equal('René');
        expect(res.body.city).to.equal('Chatville');
        expect(res.body.street).to.equal('rue des Ours');
      })
      .end(done);
  });
});
