import request from 'supertest';
import server from '../server';

const agent = request(server);

describe('batch import', () => {
  it('works in the background', done => {
    agent
      .post('/api/contacts/batch')
      .attach('contactsFile', `${__dirname}/contacts.json`)
      .expect(202)
      .end(done);
  });
});
