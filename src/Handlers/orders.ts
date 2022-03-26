import {Request, Response, Application} from 'express';
import auth from '../Middlewares/auth';
import OrderStore from '../Models/order';

const store = new OrderStore();

const showCurrentOrders = async (req: Request, res: Response) => {
  try {
    const orderReturn = await store.showCurrentOrders(req.params.user_id);
    res.json(orderReturn);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const showCompletedOrders = async (req: Request, res: Response) => {
  try {
    const orderReturn = await store.showCompletedOrders(req.params.user_id);
    res.json(orderReturn);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order = await store.create({
      user_id: req.body.user_id,
      status: req.body.status,
    });
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const addOrderProduct = async (req: Request, res: Response) => {
  try {
    const orderProduct = await store.addOrderProduct({
      quantity: parseInt(req.body.quantity),
      order_id: req.params.order_id,
      product_id: req.body.product_id,
    });
    res.json(orderProduct);
  } catch (err) {
    res.status(400);
    res.json(`Error Happend ${err}`);
  }
};

const ordersRoutes = (app: Application) => {
  app.get('/orders/current_orders/:id', auth, showCurrentOrders);
  app.get('/orders/completed_orders/:id', auth, showCompletedOrders);
  app.post('/orders', auth, create);
  app.post('/orders/:order_id/products', auth, addOrderProduct);
};

export default ordersRoutes;
