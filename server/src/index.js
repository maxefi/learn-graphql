const { GraphQLServer } = require('graphql-yoga');

// The Prisma server provides the data access layer in your application architecture,
// making it easy for your API server to talk to the database through Prisma.
// The API of the Prisma server is consumed by the Prisma client
// inside your API server implementation(similar to an ORM).
// The API server is what you’ve started building throughout the previous chapters using graphql-yoga.
const { prisma } = require('./generated/prisma-client');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

/*
async function main() {

  // Create a new Link
  const newLink = await prisma.createLink({
    url: 'www.prisma.io',
    description: 'Prisma replaces traditional ORMs',
  });
  console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

  // Read all links from the database and print them to the console
  const allLinks = await prisma.links();
  console.log({ allLinks });
};

main().catch(e => console.error({ e }));
*/

// implementation of the GraphQL schema
// one of the core benefits of GraphQL in general:
// It enforces that the API actually behaves in the way that is promised by the schema definition!
// This way, everyone who has access to the GraphQL schema can always be 100% sure about the API operations
// and data structures that are returned by the API.
const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Subscription,
    Vote,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
