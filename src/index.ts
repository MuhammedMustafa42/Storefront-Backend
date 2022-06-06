import express, { Application, Request, Response } from 'express';
import errorMiddleware from './middleware/error_middleware';

const port = 3030;
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

//express server start
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

export default app;
