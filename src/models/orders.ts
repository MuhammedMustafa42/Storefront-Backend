import client from '../database';

export type order = {
  id?: number;
  user_id: number;
  status: string;
};

export type orderedProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class Order {
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get all orders ${error}`);
    }
  }

  async show(id: number): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get this order ${error}`);
    }
  }

  async create(order: order): Promise<order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.user_id, order.status]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create order ${error}`);
    }
  }

  async update(id: number, order: order): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE order SET status = $1 WHERE id = $(2) RETURNING *';
      const result = await conn.query(sql, [order.status, id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot edit the order ${error}`);
    }
  }

  async orderProduct(order: orderedProduct): Promise<orderedProduct> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        order.order_id,
        order.product_id,
        order.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot place order ${error}`);
    }
  }
}
