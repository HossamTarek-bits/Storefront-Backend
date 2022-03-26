/* eslint-disable camelcase */
import dotenv from 'dotenv';
import OrderStore from '../order';
import ProductStore from '../product';
import UserStore from '../user';
import deleteAll from './helpers/deleteAll';
dotenv.config();
const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
describe('Specs for Order Model using test database', () => {
  beforeAll(async () => await deleteAll());
  afterAll(async () => await deleteAll());
  describe('Create Method', () => {
    it('should create method be defined', () => {
      expect(store.create).toBeDefined();
    });
    it('should return the newly created order', async () => {
      const user = await userStore.create({
        first_name: 'temp',
        last_name: 'temp',
        password: 'temp',
      });
      const r = await store.create({
        user_id: user.id ? user.id.toString() : '1',
        status: 'active',
      });
      expect(r).toEqual({
        id: r.id,
        user_id: user.id ? user.id.toString() : '1',
        status: 'active',
      });
    });
  });
  describe('Add product Method', () => {
    it('should Add product method be defined', () => {
      expect(store.addOrderProduct).toBeDefined();
    });
    it('should return the newly created orderProduct', async () => {
      const user = await userStore.create({
        first_name: 'temp',
        last_name: 'temp',
        password: 'temp',
      });
      const product = await productStore.create({
        name: 'temp',
        price: 10,
        category: 'temp',
      });
      const order = await store.create({
        user_id: user.id ? user.id.toString() : '1',
        status: 'active',
      });
      const r = await store.addOrderProduct({
        quantity: 10,
        order_id: order.id ? order.id.toString() : '1',
        product_id: product.id ? product.id.toString() : '1',
      });
      expect(r).toEqual({
        id: r.id,
        quantity: 10,
        order_id: order.id ? order.id.toString() : '1',
        product_id: product.id ? product.id.toString() : '1',
      });
    });
  });
  describe('showCurrentOrder Method', () => {
    it('should showCurrentOrder method be defined', () => {
      expect(store.showCurrentOrders).toBeDefined();
    });
    it('should return the current orders', async () => {
      const user = await userStore.create({
        first_name: 'temp',
        last_name: 'temp',
        password: 'temp',
      });
      const product = await productStore.create({
        name: 'temp',
        price: 10,
        category: 'temp',
      });
      const order = await store.create({
        user_id: user.id ? user.id.toString() : '1',
        status: 'active',
      });
      await store.addOrderProduct({
        quantity: 10,
        order_id: order.id ? order.id.toString() : '1',
        product_id: product.id ? product.id.toString() : '1',
      });
      const r = await store.showCurrentOrders(
        user.id ? user.id.toString() : '1',
      );
      expect(r).toEqual([
        {
          order_id: order.id ? order.id.toString() : '1',
          user_id: user.id ? user.id.toString() : '1',
          status: 'active',
          product: {product: product, quantity: 10},
        },
      ]);
    });
  });
  describe('showCompletedOrders Method', () => {
    it('should showCompletedOrders method be defined', () => {
      expect(store.showCompletedOrders).toBeDefined();
    });
    it('should return the current orders', async () => {
      const user = await userStore.create({
        first_name: 'temp',
        last_name: 'temp',
        password: 'temp',
      });
      const product = await productStore.create({
        name: 'temp',
        price: 10,
        category: 'temp',
      });
      const order = await store.create({
        user_id: user.id ? user.id.toString() : '1',
        status: 'complete',
      });
      await store.addOrderProduct({
        quantity: 10,
        order_id: order.id ? order.id.toString() : '1',
        product_id: product.id ? product.id.toString() : '1',
      });
      const r = await store.showCompletedOrders(
        user.id ? user.id.toString() : '1',
      );
      expect(r).toEqual([
        {
          order_id: order.id ? order.id.toString() : '1',
          user_id: user.id ? user.id.toString() : '1',
          status: 'complete',
          product: {product: product, quantity: 10},
        },
      ]);
    });
  });
});
