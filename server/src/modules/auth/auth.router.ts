import express, { Router, Request, Response } from "express";

export class AuthRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();

    this.router.post('/sign-up', (req: Request, res: Response) => {
      
    });
  }
}