import { Server } from 'http';

import * as compression from 'compression';
import * as cors from 'cors';
import { config } from 'dotenv';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import authenticationMiddleware from './middleware/authorization';
import { defaultSchema } from './schema/default';
import { pdSchema } from './schema/schema';

config();

class App {
  public ROOT_URL = '/';
  public BASE_URL = '/pd';
  public app: express.Application;
  public server: Server;
  public port = process.env.PORT || 4000;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(
      this.BASE_URL,
      graphqlHTTP({
        schema: pdSchema,
        graphiql: false
      })
    );

    this.app.use(
      this.ROOT_URL,
      graphqlHTTP({
        schema: defaultSchema,
        graphiql: false
      })
    );

    this.server = this.app.listen(this.port);
  }

  private config(): void {
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(authenticationMiddleware);
  }
}

export default new App();
