const { GraphQLServer } = require('graphql-yoga');

// GraphQL schema
const typeDefs = `
  type Query {
    info: String!
  }
`

// implementation of the GraphQL schema
// one of the core benefits of GraphQL in general:
// It enforces that the API actually behaves in the way that is promised by the schema definition!
// This way, everyone who has access to the GraphQL schema can always be 100% sure about the API operations
// and data structures that are returned by the API.
const resolvers = {
  Query: {
    info: () => null
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
