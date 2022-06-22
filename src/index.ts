import express, { Application, Request, Response } from 'express';
import errorMiddleware from './middleware/error_middleware';
import dotenv from 'dotenv';
import cyberwares_routes from './handlers/cyberwares-store';
import orders_routes from './handlers/orders';
import users_routes from './handlers/users';

dotenv.config();

const { PORT } = process.env;

const port = PORT || 3030;
//server instance
const app: Application = express();

//middleware to parse the requests
app.use(express.json());

//main endpoint route
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the second project');
});

app.use((_req: Request, res: Response) => {
  res
    .status(404)
    .send(
      'route not found, please read the documentation for available routes'
    );
});

app.use(errorMiddleware);

cyberwares_routes(app);
orders_routes(app);
users_routes(app);

//express server start
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

export default app;
