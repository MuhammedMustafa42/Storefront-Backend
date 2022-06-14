import express, { Request, Response } from 'express';
import { order, Order } from '../models/orders';

const productOrder = new Order();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await productOrder.index();
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await productOrder.show(req.params.id as unknown as number);
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order = await productOrder.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleteOrder = await productOrder.delete(
      req.params.id as unknown as number
    );
    res.json(deleteOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const updateOrder: order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const updatedOrder = await productOrder.update(req.body.id, updateOrder);
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await productOrder.orderProduct(req.body);
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/order/:id', show);
  app.post('/order', create);
  app.delete('/delorder/:id', destroy);
  app.put('updateorder', update);
  app.post('/placeorder', createOrder);
};

export default orders_routes;
