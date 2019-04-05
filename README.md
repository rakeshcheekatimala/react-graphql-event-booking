# GraphQL
    * It helps to request the data the client is interested for.
    * Every Request is Post request which is embedded with a query expression that client has requested to return.
    * It works with any sever side language.

# Packages: 
(express-graphql)
    * To create the graphqlHTTP() we use the express-graphql package.
    * It is provided with configuration object with the following properties set:
        * schema, our GraphQL schema
        * rootValue, our resolver functions
        * graphiql, a boolean stating wether to use graphiql, we want that so we pass `true` here

(graphql) 

buildSchema is the method that we use from graphql to create the schema which exposes the functions to client.

schema object has two properties 'query' where all the get methods are defined. (ex: http get methods)

mutation helps to define all the methods related to (POST,DELETE,PATCH,DELETE)

#Resolver 

    You can think this a controller and it has all the functions that are defined in buildSchema.
    When a request comes the respective buildSchema specification once parsed the equivalent resolver function is executed.

    <code>
            query {
                events:{
                    title
                }
            }

    </code>

    The above snippet invokes the events function in the resolver and returns title.

    Note: The names defined in the schema should match with the resolver names.