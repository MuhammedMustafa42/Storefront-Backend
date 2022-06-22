import client from '../database';

export type cyberware = {
  name: string;
  price: number;
  id?: number;
};

export class Cyberware {
  async index(): Promise<cyberware[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM cyberwares';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get all cyberwares ${error}`);
    }
  }

  async show(id: number): Promise<cyberware> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM cyberwares WHERE id = ($1)';
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot find cyberware ${error}`);
    }
  }

  async create(cyberware: cyberware): Promise<cyberware> {
    try {
      const connect = await client.connect();
      const sql =
        'INSERT INTO cyberwares (name, price) VALUES ($1, $2) RETURNING *';
      const result = await connect.query(sql, [
        cyberware.name,
        cyberware.price,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create cyberware ${error}`);
    }
  }

  async update(id: number, cyberware: cyberware): Promise<cyberware> {
    try {
      const connect = await client.connect();
      const sql =
        'UPDATE cyberwares SET name = $1, price = $2 WHERE id = ($3) RETURNING *';
      const result = await connect.query(sql, [
        cyberware.name,
        cyberware.price,
        id,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot edit cyberware ${error}`);
    }
  }

  async delete(id: number): Promise<cyberware> {
    try {
      const connect = await client.connect();
      const sql = 'DELETE FROM cyberwares WHERE id = ($1)';
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete cyberware ${error}`);
    }
  }
}
