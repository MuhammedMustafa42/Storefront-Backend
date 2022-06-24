import { order, Order } from '../../models/orders';

const store = new Order();

describe('orders Model', () => {
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
    const result: order = await store.create({
      user_id: 1,
      status: 'active',
    });
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active',
    });
  });

  it('index method should return a list of orders', async () => {
    const result: order[] = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 'active',
      },
    ]);
  });

  it('show method should return a specific order', async () => {
    const result: order = await store.show(1);
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active',
    });
  });

  it('delete method should remove a specific order', async () => {
    store.delete(1);
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
