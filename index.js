import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import errorMessages from './errorMessages';
import graphQlSchema from './graphql/schema/index';
import graphQlResolvers from './graphql/resolvers/index';
import isAuth from './middleware/is-auth';

const app = express();
const PORT = process.env.PORT || 4000;
//Set up default mongoose connection
const mongoDB = process.env.db_url;
//Get the default connection
const db = mongoose.connection;

app.use(bodyParser());

// Pass a secret to sign the secured http cookie

app.use(cookieParser(process.env.secret));

console.log(`The mongoDB url connection is `, mongoDB);

mongoose.connect(mongoDB, { useNewUrlParser: true });
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', ref => {
  console.log('Connected to mongo server --- sever will be started');
  startServer();
});

const user = userId => {
  return User.findById(userId).then(result => {
    return {
      ...result._doc,
      _id: result.id,
      createdEvents: events.bind(this, result._doc.createdEvents),
    };
  });
};

const events = eventIds => {
  return Event.find({ _id: { $in: eventIds } })
    .then(events => {
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          creator: user.bind(this, event.creator),
        };
      });
    })
    .catch(err => {
      throw err;
    });
};

/*
    isAuth is the middleware that will be check for jwt token set in the cookie
    if the cookie is found req.isAuth is set true which helps in knowing the user is authenticated successfully
*/

app.use(isAuth);

/*
    Setting the Graphql Endpoint, in graphql there is one rood endpoint
    to which all the requests comes
    ! means non nullable 
    Context helps to send req, res to graphql resolvers so that you can use
*/
app.use('/graphql', (req, res) => {
  return graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: { req, res },
  })(req, res);
});

app.get('/', (req, res) => {
  res.end('hello');
});

function startServer() {
  app.listen(PORT, () => {
    console.log('server is listening on ', PORT);
  });
}
