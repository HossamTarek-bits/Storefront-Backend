/* eslint-disable camelcase */
import client from '../database';
import {Product} from './product';
export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export type OrderProduct = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
};

export type OrderReturnType = {
  order_id: string;
  user_id: string;
  status: string;
  product: { product: Product; quantity: number };
};

/**
 * A Model Class for Table Orders with Order_Products
 */
export default class OrderStore {
  /**
   * Create a new order in database and return the newly created order
   * @param {Order} order -> Order to be created
   * @return {Promise<Order>} -> Created Order
   */
  async create(order: Order): Promise<Order> {
    try {
      const con = await client.connect();
      const query =
        'INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *;';
      const result = await con.query(query, [order.user_id, order.status]);
      con.release();
      const o: Order = {
        id: parseInt(result.rows[0].id),
        user_id: result.rows[0].user_id,
        status: result.rows[0].status,
      };
      return o;
    } catch (err) {
      throw new Error(`Couldn't create a new order, Error ${err}`);
    }
  }

  /**
   * Create a new order product in database and return the newly created order product
   * @param {OrderProduct} orderProduct -> Order Product to be created
   * @return {Promise<OrderProduct>} -> Created Order Product
   */
  async addOrderProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const con = await client.connect();
      const query =
        'INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *;';
      const result = await con.query(query, [
        orderProduct.quantity,
        orderProduct.order_id,
        orderProduct.product_id,
      ]);
      con.release();
      const o: OrderProduct = {
        id: parseInt(result.rows[0].id),
        quantity: parseInt(result.rows[0].quantity),
        order_id: result.rows[0].order_id,
        product_id: result.rows[0].product_id,
      };
      return o;
    } catch (err) {
      throw new Error(`Couldn't create a new order product, Error ${err}`);
    }
  }

  /**
   * Return all active orders for a specific user
   * @param {string} user_id -> User id
   * @return {Promise<OrderReturnType[]>} -> All active orders for the required user
   */
  async showCurrentOrders(user_id: string): Promise<OrderReturnType[]> {
    try {
      const con = await client.connect();
      const query = `SELECT order_id, product_id, quantity, user_id, status FROM orders 
      INNER JOIN order_products ON orders.id = order_products.order_id
      WHERE user_id = ($1) AND status = ($2) ORDER BY order_id DESC`;
      const result = await con.query(query, [user_id, 'active']);
      const orders: OrderReturnType[] = [];
      for (let i = 0; i < result.rowCount; i++) {
        const q = `SELECT * FROM products WHERE id=($1)`;
        const r = await con.query(q, [result.rows[i].product_id]);
        const product: Product = {
          id: parseInt(r.rows[0].id),
          name: r.rows[0].name,
          price: parseInt(r.rows[0].price),
          category: r.rows[0].category,
        };
        orders.push({
          order_id: result.rows[i].order_id,
          user_id: user_id,
          status: result.rows[i].status,
          product: {
            product: product,
            quantity: parseInt(result.rows[i].quantity),
          },
        });
      }
      con.release();
      return orders;
    } catch (err) {
      throw new Error(`Couldn't create a new order product, Error ${err}`);
    }
  }

  /**
   * Return all compeleted orders for a specific user
   * @param {string} user_id -> User id
   * @return {Promise<OrderReturnType[]>} -> All completed orders for the required user
   */
  async showCompletedOrders(user_id: string): Promise<OrderReturnType[]> {
    try {
      const con = await client.connect();
      const query = `SELECT order_id, product_id, quantity, user_id, status FROM orders 
      INNER JOIN order_products ON orders.id = order_products.order_id
      WHERE user_id = ($1) AND status = ($2) ORDER BY order_id DESC`;
      const result = await con.query(query, [user_id, 'complete']);
      const orders: OrderReturnType[] = [];
      for (let i = 0; i < result.rowCount; i++) {
        const q = `SELECT * FROM products WHERE id=($1)`;
        const r = await con.query(q, [result.rows[i].product_id]);
        const product: Product = {
          id: parseInt(r.rows[0].id),
          name: r.rows[0].name,
          price: parseInt(r.rows[0].price),
          category: r.rows[0].category,
        };
        orders.push({
          order_id: result.rows[i].order_id,
          user_id: user_id,
          status: result.rows[i].status,
          product: {
            product: product,
            quantity: parseInt(result.rows[i].quantity),
          },
        });
      }
      con.release();
      return orders;
    } catch (err) {
      throw new Error(`Couldn't create a new order product, Error ${err}`);
    }
  }
}
