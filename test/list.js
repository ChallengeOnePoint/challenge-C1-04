import request from 'supertest';
import server from '../server';

const agent = request(server);

describe('list contacts', () => {
  it('returns a list of users', done => {
    agent
      .get('/api/contacts')
      .expect(200)
      .end(done);
  });
});
