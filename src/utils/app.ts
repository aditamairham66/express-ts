import express, { Application, Router, RequestHandler, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import sequelize from '../config/database';
import tokenRouter from '../routes/tokenRoutes';
import ResponseHelper from './responseHelper';

class App {
  private readonly app: Application = express();
  private readonly baseApi: string = '/api';

  constructor() {
    this.configureMiddleware();
    this.configureDatabase();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(bodyParser.json());
  }

  private configureDatabase(): void {
    (async () => {
      try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await sequelize.sync({ force: true }); // Change force to false in a production environment
        console.log('Models synchronized with the database.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    })();
  }

  private configureRoutes(): void {
    this.app.use((req: Request, res: Response, next) => {
      // Mengatur instance Response pada awal permintaan
      ResponseHelper.setResponseInstance(res);
      next();
    });

    this.app.use(`${this.baseApi}/token`, tokenRouter);
  }

  public use(route: string, router: Router): void {
    this.app.use(`${this.baseApi}/${route}`, router);
  }

  public listen(port: number, callback: () => void): void {
    this.app.listen(port, callback);
  }

  public get(route: string, handler: RequestHandler): void {
    this.app.get(`${this.baseApi}/${route}`, handler);
  }

  public post(route: string, handler: RequestHandler): void {
    this.app.post(`${this.baseApi}/${route}`, handler);
  }

  public put(route: string, handler: RequestHandler): void {
    this.app.put(`${this.baseApi}/${route}`, handler);
  }

  public delete(route: string, handler: RequestHandler): void {
    this.app.delete(`${this.baseApi}/${route}`, handler);
  }
}

export default App;
