import {Request, Response, Application} from 'express';
import ProductStore from '../Models/product';
import auth from '../Middlewares/auth';
const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const products = await store.show(parseInt(req.params.id));
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const showByCategory = async (req: Request, res: Response) => {
  try {
    const products = await store.showByCategory(req.params.category);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product = await store.create({
      name: req.body.name,
      price: parseInt(req.body.price as string),
      category: req.body.category,
    });
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const productsRoute = (app: Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.get('/products/category/:category', showByCategory);
  app.post('/products', auth, create);
};
export default productsRoute;
