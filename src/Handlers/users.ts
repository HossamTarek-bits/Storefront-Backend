import dotenv from 'dotenv';
import UserStore from '../Models/user';
import {Request, Response, Application} from 'express';
import jwt from 'jsonwebtoken';
import auth from '../Middlewares/auth';
dotenv.config();

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user = await store.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    });

    const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const userRoutes = (app: Application) => {
  app.get('/users', auth, index);
  app.get('/users/:id', auth, show);
  app.post('/users', create);
};

export default userRoutes;
