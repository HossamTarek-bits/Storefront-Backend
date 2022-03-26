import supertest from 'supertest';
import UserStore, {User} from '../../Models/user';
import app from '../../server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import deleteAll from '../../Models/tests/helpers/deleteAll';
dotenv.config();
const request = supertest(app);
const store = new UserStore();
describe('Testing Users Routes', () => {
  let user: User;
  let token: string;
  beforeAll(async () => {
    await deleteAll();
    user = await store.create({
      first_name: 'temp',
      last_name: 'temp',
      password: 'temp',
    });
    token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string);
  });

  it('should return 200 at index endpoint', async () => {
    const response = await request
        .get('/users')
        .set('Authorization', 'bearer ' + token);
    expect(response.statusCode).toBe(200);
  });
  it('should return 200 at show endpoint', async () => {
    const response = await request
        .get(`/users/${user.id}`)
        .set('Authorization', 'bearer ' + token);
    expect(response.statusCode).toBe(200);
  });
  it('should return 200 at create endpoint', async () => {
    const response = await request
        .post('/users')
        .send({first_name: 'temp', last_name: 'temp', password: 'temp'});
    expect(() =>
      jwt.verify(response.body, process.env.TOKEN_SECRET as string),
    ).not.toThrow();
  });
});
