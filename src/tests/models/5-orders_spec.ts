import { order, Order } from '../../models/orders';
import { User, user } from '../../models/users';

const customer = new User();
const store = new Order();
const testOrder: order = {
  user_id: 1,
  order_status: 'active',
};

describe('orders Model', () => {
  beforeAll(async () => {
    const newUser: user = await customer.create({
      firstname: 'mustafa',
      lastname: 'mustafa',
      email: 'mustafamustafa_test@udacity',
      password_digest: '12345',
    });
    if (newUser.id) {
      testOrder.user_id = newUser.id;
    }
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it(`should have an orderProduct method`, () => {
    expect(store.orderProduct).toBeDefined();
  });

  it('create method should add a new order', async () => {
    const result: order = await store.create(testOrder);
    expect(result.id).toBeGreaterThanOrEqual(1);
    expect(result.user_id).toBeGreaterThanOrEqual(1);
    expect(result.order_status).toEqual('active');
  });

  it('index method should return a list of orders', async () => {
    const result: order[] = await store.index();
    expect(result[0].id).toBeGreaterThanOrEqual(1);
    expect(result[0].user_id).toBeGreaterThanOrEqual(1);
    expect(result[0].order_status).toEqual('active');
  });

  it('show method should return a specific order', async () => {
    const result: order = await store.show(1);
    expect(result.id).toBeGreaterThanOrEqual(1);
    expect(result.user_id).toBeGreaterThanOrEqual(1);
    expect(result.order_status).toEqual('active');
  });

  it('delete method should remove a specific order', async () => {
    store.delete(1);
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
