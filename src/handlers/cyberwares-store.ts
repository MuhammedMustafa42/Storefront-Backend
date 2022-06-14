import express, { Request, Response } from 'express';
import { cyberware, Cyberware } from '../models/cyberwares-store';

const cyberwareStore = new Cyberware();

const index = async (_req: Request, res: Response) => {
  try {
    const cyberwares = await cyberwareStore.index();
    res.json(cyberwares);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const cyberware = await cyberwareStore.show(
      req.params.id as unknown as number
    );
    res.json(cyberware);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newCyberware = await cyberwareStore.create(req.body);
    res.json(newCyberware);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleteCyberware = await cyberwareStore.delete(
      req.params.id as unknown as number
    );
    res.json(deleteCyberware);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const updateCyberware: cyberware = {
      name: req.body.name,
      price: req.body.price,
    };
    const updatedCyberware = await cyberwareStore.update(
      req.body.id,
      updateCyberware
    );
    res.json(updatedCyberware);
  } catch (error) {
    res.status(400).json(error);
  }
};

const cyberwares_routes = (app: express.Application) => {
  app.get('/cyberwares', index);
  app.get('/cyberware/:id', show);
  app.post('/cyberware', create);
  app.delete('/delcyberware/:id', destroy);
  app.put('updatecyberware', update);
};

export default cyberwares_routes;
