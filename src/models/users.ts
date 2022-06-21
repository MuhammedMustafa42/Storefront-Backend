import client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export type user = {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password_digest: string | number;
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
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const result = await client.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot find user ${error}`);
    }
  }

  async create(user: user): Promise<user> {
    try {
      const connect = await client.connect();
      const sql =
        'INSERT INTO users (firstnamem, lastname, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password_digest + pepper,
        parseInt(saltRounds)
      );
      const result = await connect.query(sql, [
        user.firstname,
        user.lastname,
        user.email,
        hash,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create user ${error}`);
    }
  }

  async authenticate(email: string, password: string): Promise<user | null> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT password_digest FROM users WHERE email=($1)';
      const result = await connect.query(sql, [email]);
      connect.release();
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Cannot authenticate user ${error}`);
    }
  }

  async delete(id: number): Promise<user> {
    try {
      const connect = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete user ${error}`);
    }
  }
}
