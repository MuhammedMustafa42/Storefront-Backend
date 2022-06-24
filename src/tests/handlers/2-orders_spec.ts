import supertest from 'supertest';
import app from '../../index';
import { token } from './1-users_spec';

const request = supertest(app);

describe('Orders handlers', () => {
  // beforeAll(async () => {
  //   await request.post('/orders').send({ user_id: 1, order_status: 'delivered' });
  // });

  it('creates an order', async () => {
    const res = await request
      .post('/order')
      .send({ user_id: 1, order_status: 'delivered' })
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
  });

  it('gets all orders', async () => {
    const res = await request
      .get('/orders')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].id).toBeGreaterThanOrEqual(1);
  });

  it('gets order by id', async () => {
    const res = await request
      .get('/order/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.status).toEqual('delivered');
    expect(res.body.user_id).toBeGreaterThanOrEqual(1);
  });

  it('deletes order by id', async () => {
    const res = await request
      .delete('/delorder/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
  });
});
