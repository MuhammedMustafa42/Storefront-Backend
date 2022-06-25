import supertest from 'supertest';
import app from '../../index';
import { token } from './1-users_spec';
import client from '../../database';

const request = supertest(app);

describe('cyberwares handlers', () => {
  afterAll(async () => {
    // clean database
    const connection = await client.connect();
    const sql =
      'DELETE FROM cyberwares;\nALTER SEQUENCE cyberwares_id_seq RESTART WITH 1;'
    await connection.query(sql);
    connection.release();
  });
  

  it('creates a cyberware', async () => {
    const res = await request
      .post('/cyberware')
      .send({ name: 'monowire', price: 150 })
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
  });

  it('show all cyberwares', async () => {
    const res = await request.get('/cyberwares');
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.length).toEqual(1);
    expect(res.body[0].id).toEqual(1);
  });

  it('get cyberware by id', async () => {
    const res = await request.get('/cyberware/1');
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.name).toEqual('monowire');
    expect(res.body.price).toEqual(150);
  });

  it('deletes cyberware by id', async () => {
    const res = await request
      .delete('/delcyberware/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
  });
});
