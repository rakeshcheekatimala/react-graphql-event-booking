import express from 'express'
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;
//Set up default mongoose connection
const mongoDB = process.env.db_url;
//Get the default connection
const db = mongoose.connection;
let events = [];

app.use(bodyParser())

console.log(`The mongoDB url connection is `, mongoDB);

mongoose.connect(mongoDB, { useNewUrlParser: true });
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on("open", (ref)=> {
    console.log("Connected to mongo server --- sever will be started");
    startServer();
});
  
/*
    Setting the Graphql Endpoint, in graphql there is one rood endpoint
    to which all the requests comes
    ! means non nullable 
*/
app.use('/graphql',graphqlHttp({
    schema:buildSchema(`

        type Event {
            _id: ID!
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        type RootQuery {
            events:[Event!]!
        }

        input EventInput {
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        type RootMutation {
            createEvent (eventInput:EventInput): Event
        }

        schema{
            query: RootQuery
            mutation : RootMutation
        }
    `),
    rootValue:{
         events:() =>{
             return events;
         },
         createEvent:(args)=>{
            console.log("--inside the createEvent Resolver",{...args["eventInput"]})
            const event = {...args["eventInput"]};
            event["_id"] = Math.random().toString()
    
            console.log("--inside the createEvent before return of Resolver \n",JSON.stringify(event))
            events.push(event);
            return event;
         }
    },
    graphiql:true
})

)

app.get('/',(req,res)=>{
    res.end("hello");
})

function startServer() {
    app.listen(PORT,()=>{
        console.log('server is listening on ', PORT );
    })
}
