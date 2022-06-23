import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
export let token = '';

describe('Users handlers', () => {
  it('creates user', async (done) => {
    const res = await request.post('/users').send({
      firstname: 'muhammed',
      lastname: 'mustafa',
      email: 'muhammedmustafa@udacity',
      password_digest: 1234,
    });
    token = res.body;
    expect(res.status).toBe(200);
    done();
  });

  it('shows a list of users', async (done) => {
    const res = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.length).toEqual(1);
    expect(res.body[0].id).toEqual(1);
    done();
  });

  it('show user by id', async (done) => {
    const res = await request
      .get('/user/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.firstname).toEqual('muhammed');
    expect(res.body.lastname).toEqual('mustafa');
    expect(res.body.email).toEqual('muhammedmustafa@udacity');
    done();
  });

  it('delete user by id', async (done) => {
    const res = await request
      .delete('/deluser/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    done();
  });
});
