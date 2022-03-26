import supertest from 'supertest';
import UserStore, {User} from '../../Models/user';
import app from '../../server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import deleteAll from '../../Models/tests/helpers/deleteAll';
import ProductStore, {Product} from '../../Models/product';
dotenv.config();
const request = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();
describe('Testing Products Routes', () => {
  let user: User;
  let token: string;
  let product: Product;
  beforeAll(async () => {
    await deleteAll();
    user = await userStore.create({
      first_name: 'temp',
      last_name: 'temp',
      password: 'temp',
    });
    product = await productStore.create({
      name: 'temp',
      price: 10,
      category: 'temp',
    });
    token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string);
  });

  it('should return 200 at index endpoint', async () => {
    const response = await request.get('/products');
    expect(response.statusCode).toBe(200);
  });
  it('should return 200 at show endpoint', async () => {
    const response = await request.get(`/products/${product.id}`);
    expect(response.statusCode).toBe(200);
  });
  it('should return 200 at showByCategory endpoint', async () => {
    const response = await request.get('/products/category/temp');
    expect(response.statusCode).toBe(200);
  });
  it('should return 200 at create endpoint', async () => {
    const response = await request
        .post('/products')
        .set('Authorization', 'bearer ' + token)
        .send({name: 'name', price: 10, category: 'temp'});
    expect(response.statusCode).toBe(200);
  });
});
