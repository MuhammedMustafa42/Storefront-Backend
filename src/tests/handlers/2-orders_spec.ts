import supertest from 'supertest';
import app from '../../index';
import { order } from '../../models/orders';
import client from '../../database';
import { User } from '../../models/users';

const customer = new User();
const request = supertest(app);
// let token = '';
const order: order = { user_id: 1, order_status: 'delivered' };

describe('Orders handlers', () => {
  beforeAll(async () => {
    await customer.create({
      firstname: 'eslam',
      lastname: 'kery',
      email: 'eslamkery@udacity',
      password_digest: '2468',
    });
  });
  // beforeAll( async () => {
  //   await request
  //     .post('/createorder')
  //     .send({ user_id: 1, order_status: 'delivered' });
  // });

  afterAll(async () => {
    // clean database
    const connection = await client.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });

  // it('should be able to authenticate to get token', async () => {
  //   const res = await request
  //     .post('/users/authen')
  //     .send({
  //       email: 'eslamkery@udacity',
  //       password_digest: '2468',
  //     })
  //     .set('Content-type', 'application/json')
  //     .set('Authorization', `Bearer ${token}`);
  //   const email = res.body.email;
  //   const userToken = res.body.token;
  //   token = userToken;
  //   expect(res.status).toBe(200);
  //   expect(email).toBe('eslamkery@udacity');
  // });

  it('creates an order', async () => {
    const res = await request
      .post('/order')
      .send(order)
      // .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
  });

  it('gets all orders', async () => {
    const res = await request
      .get('/orders')
      // .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].id).toBeGreaterThanOrEqual(1);
  });

  it('gets order by id', async () => {
    const res = await request
      .get('/order/1')
      // .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.order_status).toEqual('delivered');
    expect(res.body.user_id).toBeGreaterThanOrEqual(1);
  });

  it('deletes order by id', async () => {
    const res = await request
      .delete('/delorder/1')
      // .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
  });
});
