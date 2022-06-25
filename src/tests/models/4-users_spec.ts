import { User, user } from '../../models/users';

const customer = new User();

describe('users Model', () => {
  it('should have an index method', () => {
    expect(customer.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(customer.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(customer.create).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(customer.authenticate).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(customer.delete).toBeDefined();
  });

  it('should have a update method', () => {
    expect(customer.update).toBeDefined();
  });

  it('create method should add a new user', async () => {
    const result: user = await customer.create({
      firstname: 'muhammed',
      lastname: 'mustafa',
      email: 'muhammedmustafa@udacity',
      password_digest: '1234',
    });
    expect(result.id).toBeGreaterThanOrEqual(1);
    expect(result.firstname).toEqual('muhammed');
    expect(result.lastname).toEqual('mustafa');
    expect(result.email).toEqual('muhammedmustafa@udacity');
  });

  it('index method should return a list of users', async () => {
    const result: user[] = await customer.index();
    expect(result[0].id).toBeGreaterThanOrEqual(1);
    expect(result[0].firstname).toEqual('muhammed');
    expect(result[0].lastname).toEqual('mustafa');
    expect(result[0].email).toEqual('muhammedmustafa@udacity');
  });
  it('show method should return a specific user', async () => {
    const result: user = await customer.show(1);
    expect(result.id).toBeGreaterThanOrEqual(1);
    expect(result.firstname).toEqual('muhammed');
    expect(result.lastname).toEqual('mustafa');
    expect(result.email).toEqual('muhammedmustafa@udacity');
  });

  // it('delete method should remove a specific user', async () => {
  //   customer.delete(1);
  //   const result = await customer.index();
  //   expect(result).toEqual([]);
  // });
});
