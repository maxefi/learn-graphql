const { GraphQLServer } = require('graphql-yoga');

// GraphQL schema
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }
  
  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}];

// implementation of the GraphQL schema
// one of the core benefits of GraphQL in general:
// It enforces that the API actually behaves in the way that is promised by the schema definition!
// This way, everyone who has access to the GraphQL schema can always be 100% sure about the API operations
// and data structures that are returned by the API.
const resolvers = {
  Query: {
    info: () => null,
    feed: () => links,
  },
  Link: {
    id: (parent) => parent.id,
    url: (parent) => parent.url,
    description: (parent) => parent.description,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
