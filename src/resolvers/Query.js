const feed = async (root, args, context, info) => {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter },
    ],
  } : {}

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
  })

  return links
}

const link = (root, args, context, info) => {
  console.log({ id: args.id });
  return context.prisma.links({ where: { id: args.id } });
}

module.exports = {
  feed,
  link,
}
