import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';

export class WebServer {
  static app: Express;

  static async start(port: number) {
    this.app = express();

    this.app.use(cors());

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.raw());
    this.app.use(bodyParser.text());

    this.app.listen(port || 5555, () => {
      console.log(`Web server started on ${port} port`);
    });
  }
}