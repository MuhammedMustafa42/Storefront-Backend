import client from '../database';

export type user = {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string | number;
};

export class User {
  async index(): Promise<user[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get all users ${error}`);
    }
  }

  async show(id: number): Promise<user> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)'
      const result = await client.query(sql,[id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot find user ${error}`);
    }
  }


}
