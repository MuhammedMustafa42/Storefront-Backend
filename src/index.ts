import express, { Application, Request, Response } from 'express';

const port = 3030;
//server instance
const app: Application = express();

//main endpoint route
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the second project');
});

//express server start
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

export default app;
