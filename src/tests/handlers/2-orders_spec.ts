import supertest from 'supertest';
import app from '../../index';
import { token } from './1-users_spec';

const request = supertest(app);

describe('Orders handlers', () => {
  // beforeAll(async (done) => {
  //   await request.post('/orders').send({ status: 'delivered', user_id: 1 });
  //   done();
  // });

  it('creates an order', async (done) => {
    const res = await request
      .post('/orders')
      .send({ status: 'delivered', user_id: 1 })
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    done();
  });

  it('gets all orders', async (done) => {
    const res = await request
      .get('/orders')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.length).toEqual(1);
    expect(res.body[0].id).toEqual(1);
    done();
  });

  it('gets order by id', async (done) => {
    const res = await request
      .get('/order/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.status).toEqual('delivered');
    expect(res.body.user_id).toEqual(1);
    done();
  });

  it('deletes order by id', async (done) => {
    const res = await request
      .delete('/delorder/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    done();
  });
});
