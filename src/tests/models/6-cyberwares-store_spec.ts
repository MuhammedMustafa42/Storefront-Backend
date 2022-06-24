import { cyberware, Cyberware } from '../../models/cyberwares-store';

const product = new Cyberware();

describe('cyberwares Model', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(product.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(product.delete).toBeDefined();
  });

  it('should have a update method', () => {
    expect(product.update).toBeDefined();
  });

  it('create method should add a new cyberware', async () => {
    const result: cyberware = await product.create({
      name: 'monowire',
      price: 150,
    });
    expect(result.id).toBeGreaterThanOrEqual(1);
    expect(result.name).toEqual('monowire');
    expect(result.price).toEqual(150);
  });

  it('index method should return a list of cyberwares', async () => {
    const result: cyberware[] = await product.index();
    expect(result[0].id).toBeGreaterThanOrEqual(1);
    expect(result[0].name).toEqual('monowire');
    expect(result[0].price).toEqual(150);
  });

  it('show method should return a specific cyberware', async () => {
    const result: cyberware = await product.show(1);
    expect(result.id).toBeGreaterThanOrEqual(1);
    expect(result.name).toEqual('monowire');
    expect(result.price).toEqual(150);
  });

  it('delete method should remove a specific cyberware', async () => {
    product.delete(1);
    const result = await product.index();
    expect(result).toEqual([]);
  });
});
