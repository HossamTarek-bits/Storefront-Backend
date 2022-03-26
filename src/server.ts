import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import userRoutes from './Handlers/users';
import productRoutes from './Handlers/products';
import ordersRoutes from './Handlers/orders';
import cors from 'cors';
const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req: Request, res: Response) {
  res.send('Hello World!');
});

userRoutes(app);
productRoutes(app);
ordersRoutes(app);

app.listen(3000, function() {
  console.log(`starting app on: ${address}`);
});

export default app;
