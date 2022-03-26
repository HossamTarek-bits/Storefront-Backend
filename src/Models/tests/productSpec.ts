import dotenv from 'dotenv';
import client from '../../database';
import ProductStore, {Product} from '../product';
import deleteAll from './helpers/deleteAll';
dotenv.config();
const store = new ProductStore();

describe('Specs for Product Model using test database', () => {
  beforeAll(async () => await deleteAll());
  afterAll(async () => await deleteAll());
  describe('Index Method', () => {
    let defaultProduct: Product;
    beforeAll(async () => {
      const con = await client.connect();
      let query = 'DELETE FROM products;';
      await con.query(query);
      query =
        'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) returning *;';
      const result = await con.query(query, ['temp', 10, 'temp']);
      defaultProduct = {
        id: parseInt(result.rows[0].id),
        name: result.rows[0].name,
        price: parseInt(result.rows[0].price),
        category: result.rows[0].category,
      };
    });
    it('should index method be defined', () => {
      expect(store.index).toBeDefined();
    });
    it('should return all products from database', async () => {
      const r = await store.index();
      expect(r).toEqual([defaultProduct]);
    });
  });
  describe('Show Method', () => {
    let defaultProduct: Product;
    beforeAll(async () => {
      const con = await client.connect();
      let query = 'DELETE FROM products;';
      await con.query(query);
      query =
        'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) returning *;';
      const result = await con.query(query, ['temp', 10, 'temp']);
      defaultProduct = {
        id: parseInt(result.rows[0].id),
        name: result.rows[0].name,
        price: parseInt(result.rows[0].price),
        category: result.rows[0].category,
      };
    });
    it('should show method be defined', () => {
      expect(store.show).toBeDefined();
    });
    it('should return the product with default product id when given its as a parameter', async () => {
      const r = await store.show(
        defaultProduct.id !== undefined ? defaultProduct.id : 1,
      );
      expect(r).toEqual(defaultProduct);
    });
  });
  describe('Show by category Method', () => {
    let defaultProduct: Product;
    beforeAll(async () => {
      const con = await client.connect();
      let query = 'DELETE FROM products;';
      await con.query(query);
      query =
        'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) returning *;';
      const result = await con.query(query, ['temp', 10, 'temp']);
      defaultProduct = {
        id: parseInt(result.rows[0].id),
        name: result.rows[0].name,
        price: parseInt(result.rows[0].price),
        category: result.rows[0].category,
      };
    });
    it('should show by category method be defined', () => {
      expect(store.showByCategory).toBeDefined();
    });
    it('should return all products with category temp when given temp as a parameter', async () => {
      const r = await store.showByCategory('temp');
      expect(r).toEqual([defaultProduct]);
    });
  });

  describe('Create Method', () => {
    beforeAll(async () => {});
    it('should create method be defined', () => {
      expect(store.create).toBeDefined();
    });
    it('should return the newly created product', async () => {
      const r = await store.create({
        name: 'temp',
        price: 10,
        category: 'temp',
      });
      expect(r).toEqual({
        id: r.id,
        name: 'temp',
        price: 10,
        category: 'temp',
      });
    });
  });
});
