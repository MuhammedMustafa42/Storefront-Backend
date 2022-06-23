import supertest from 'supertest';
import app from '../../index';
import { token } from './1-users_spec';

const request = supertest(app);

describe('cyberwares handlers', () => {
  it('creates a cyberware', async (done) => {
    const res = await request
      .post('/cyberware')
      .send({ name: 'monowire', price: 150 })
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    done();
  });

  it('show all cyberwares', async (done) => {
    const res = await request.get('/cyberwares');
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.length).toEqual(1);
    expect(res.body[0].id).toEqual(1);
    done();
  });

  it('get cyberware by id', async (done) => {
    const res = await request.get('/cyberware/1');
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.name).toEqual('monowire');
    expect(res.body.price).toEqual(150);
    done();
  });

  it('deletes cyberware by id', async (done) => {
    const res = await request
      .delete('/delcyberware/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    done();
  });
});
