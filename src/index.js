const { GraphQLServer } = require('graphql-yoga');

// The Prisma server provides the data access layer in your application architecture,
// making it easy for your API server to talk to the database through Prisma.
// The API of the Prisma server is consumed by the Prisma client
// inside your API server implementation(similar to an ORM).
// The API server is what you’ve started building throughout the previous chapters using graphql-yoga.
/*
const { prisma } = require('./generated/prisma-client');

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

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}];

let idCount = links.length;

// implementation of the GraphQL schema
// one of the core benefits of GraphQL in general:
// It enforces that the API actually behaves in the way that is promised by the schema definition!
// This way, everyone who has access to the GraphQL schema can always be 100% sure about the API operations
// and data structures that are returned by the API.
const resolvers = {
  Query: {
    info: () => null,
    feed: () => links,
    link: (parent, args) => links.find(link => link.id === args.id),
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);

      return link;
    },
    updateLink: (parent, args) => {
      let link = links.find(link => link.id === args.id);

      if (link) {
        const { url, description } = link;

        if (url) link.url = url;
        if (description) link.description = description;

        return link;
      }
    },
    deleteLink: (parent, args) => {
      const link = links.find(link => link.id === args.id);

      if (link) {
        const filteredLinks = links.filter(link => link.id !== args.id);
        console.log({ filteredLinks });

        links = filteredLinks;

        return link;
      }
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
