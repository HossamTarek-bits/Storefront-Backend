import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

/**
 * A Model Class for Table Users
 */
export default class UserStore {
  /**
   * Get all Users from database.
   * @return {Promise<User[]>}
   */
  async index(): Promise<User[]> {
    try {
      const con = await client.connect();
      const query = 'SELECT * FROM users;';
      const result = await con.query(query);
      con.release();
      const u: User[] = [];
      for (let i = 0; i < result.rowCount; i++) {
        u.push({
          id: parseInt(result.rows[i].id),
          first_name: result.rows[i].first_name,
          last_name: result.rows[i].last_name,
          password: result.rows[i].password,
        });
      }
      return u;
    } catch (err) {
      throw new Error(`Couldn't get all users from database, Error ${err}`);
    }
  }

  /**
   * Get a User with specific id
   * @param {number} id -> User Id
   * @return {User}
   */
  async show(id: number): Promise<User> {
    try {
      const con = await client.connect();
      const query = 'SELECT * FROM users WHERE id = ($1);';
      const result = await con.query(query, [id]);
      con.release();
      const u: User = {
        id: parseInt(result.rows[0].id),
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        password: result.rows[0].password,
      };
      return u;
    } catch (err) {
      throw new Error(
          `Couldn't get user with id: ${id} from database, Error ${err}`,
      );
    }
  }

  /**
   * Create a new user in database and return the newly created user
   * @param {User} user -> User to be created
   * @return {Promise<User>} -> Created User
   */
  async create(user: User): Promise<User> {
    try {
      const hash = bcrypt.hashSync(
          user.password + process.env.PEPPER,
          parseInt(process.env.SALT_ROUNDS as string),
      );
      const con = await client.connect();
      const query =
        'INSERT INTO users (first_name,last_name,password) VALUES ($1,$2,$3) RETURNING *;';
      const result = await con.query(query, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      con.release();
      const u: User = {
        id: parseInt(result.rows[0].id),
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        password: result.rows[0].password,
      };
      return u;
    } catch (err) {
      throw new Error(`Couldn't get create a new user, Error ${err}`);
    }
  }
}
