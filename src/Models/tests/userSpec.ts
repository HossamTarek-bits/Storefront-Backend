import dotenv from 'dotenv';
import UserStore, {User} from '../user';
import client from '../../database';
import bcrypt from 'bcrypt';
import deleteAll from './helpers/deleteAll';
dotenv.config();
const store = new UserStore();

describe('Specs for User Model using test database', () => {
  beforeAll(async () => await deleteAll());
  afterAll(async () => await deleteAll());
  const hash = bcrypt.hashSync(
      'temp' + process.env.PEPPER,
      parseInt(process.env.SALT_ROUNDS as string),
  );
  describe('Index Method', () => {
    let defaultUser: User;
    beforeAll(async () => {
      const con = await client.connect();
      const query =
        'INSERT INTO users (first_name,last_name,password) VALUES ($1,$2,$3) returning *;';
      const result = await con.query(query, ['temp', 'temp', hash]);
      defaultUser = {
        id: parseInt(result.rows[0].id),
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        password: result.rows[0].password,
      };
    });
    it('should index method be defined', () => {
      expect(store.index).toBeDefined();
    });
    it('should return all users from database', async () => {
      const r = await store.index();
      expect(r).toEqual([defaultUser]);
    });
  });
  describe('Show Method', () => {
    let defaultUser: User;
    beforeAll(async () => {
      const con = await client.connect();
      const query =
        'INSERT INTO users (first_name,last_name,password) VALUES ($1,$2,$3) returning *;';
      const result = await con.query(query, ['temp', 'temp', hash]);
      defaultUser = {
        id: parseInt(result.rows[0].id),
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        password: result.rows[0].password,
      };
    });
    it('should show method be defined', () => {
      expect(store.show).toBeDefined();
    });
    it('should return the user with defaultUser id when given its id as a paramter', async () => {
      const r = await store.show(
        defaultUser.id !== undefined ? defaultUser.id : 1,
      );
      expect(r).toEqual(defaultUser);
    });
  });
  describe('Create Method', () => {
    it('should create method be defined', () => {
      expect(store.create).toBeDefined();
    });
    it('should return the newly created user', async () => {
      const r = await store.create({
        first_name: 'temp',
        last_name: 'temp',
        password: 'temp',
      });
      expect(r).toEqual({
        id: r.id,
        first_name: 'temp',
        last_name: 'temp',
        password: r.password,
      });
    });
  });
});
