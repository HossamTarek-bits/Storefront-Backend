import supertest from 'supertest';
import UserStore, {User} from '../../Models/user';
import app from '../../server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import deleteAll from '../../Models/tests/helpers/deleteAll';
import OrderStore, {Order} from '../../Models/order';
import ProductStore, {Product} from '../../Models/product';
dotenv.config();
const request = supertest(app);
const userStore = new UserStore();
const orderStore = new OrderStore();
const productStore = new ProductStore();
describe('Testing Orders Routes', () => {
  let user: User;
  let order: Order;
  let product: Product;
  let token: string;
  beforeAll(async () => {
    await deleteAll();
    user = await userStore.create({
      first_name: 'temp',
      last_name: 'temp',
      password: 'temp',
    });
    order = await orderStore.create({
      user_id: user.id ? user.id.toString() : '1',
      status: 'active',
    });
    await orderStore.create({
      user_id: user.id ? user.id.toString() : '1',
      status: 'complete',
    });
    product = await productStore.create({
      name: 'temp',
      price: 10,
      category: 'temp',
    });
    token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string);
  });

  it('should return 200 at show current orders endpoint', async () => {
    const response = await request
        .get('/orders/current_orders/:1')
        .set('Authorization', 'bearer ' + token);
    expect(response.statusCode).toBe(200);
  });
  it('should return 200 at show completed orders endpoint', async () => {
    const response = await request
        .get('/orders/completed_orders/1')
        .set('Authorization', 'bearer ' + token);
    expect(response.statusCode).toBe(200);
  });
  it('should return 200 at create endpoint', async () => {
    const response = await request
        .post('/orders')
        .set('Authorization', 'bearer ' + token)
        .send({user_id: user.id, status: 'active'});
    expect(response.statusCode).toBe(200);
  });
  it('should return 200 at create order product endpoint', async () => {
    const response = await request
        .post(`/orders/${order.id}/products`)
        .set('Authorization', 'bearer ' + token)
        .send({quantity: 10, order_id: order.id, product_id: product.id});
    expect(response.statusCode).toBe(200);
  });
});
