import express, { Request, Response } from 'express';
import { User, user } from '../models/users';
import jwt, { Secret } from 'jsonwebtoken';

const customer = new User();

const index = async (req: Request, res: Response) => {
  try {
    const headerAuth = req.headers.authorization;
    const token = (headerAuth as string).split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json(`Access denied, invalid token ${error}`);
    return;
  }
  try {
    const users = await customer.index();
    res.json(users);
  } catch (error) {
    throw new Error(`Cannot view users ${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const headerAuth = req.headers.authorization;
    const token = (headerAuth as string).split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json(`Access denied, invalid token ${error}`);
    return;
  }

  try {
    const user = await customer.show(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    throw new Error(`Cannot show user ${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newUser = await customer.create(req.body);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as Secret
    );
    res.json(token);
  } catch (error) {
    throw new Error(`Cannot create user ${error}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const headerAuth = req.headers.authorization;
    const token = (headerAuth as string).split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    if ((decoded as jwt.JwtPayload).user.email !== req.body.email) {
      throw new Error(`Email doesn't match`);
    }
  } catch (error) {
    res.json(error);
  }
  try {
    const updateUser: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password_digest: req.body.password_digest,
    };
    const updatedUser = await customer.update(req.body.id, updateUser);
    res.json(updatedUser);
  } catch (error) {
    throw new Error(`Cannot update user ${error}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const headerAuth = req.headers.authorization;
    const token = (headerAuth as string).split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json(`Access denied, invalid token ${error}`);
    return;
  }
  try {
    const remove = await customer.delete(parseInt(req.params.id));
    res.json(remove);
  } catch (error) {
    throw new Error(`Cannot delete user ${error}`);
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/user/:id', show);
  app.post('/user', create);
  app.put('/updateuser', update);
  app.delete('/deluser/:id', destroy);
};

export default users_routes;
