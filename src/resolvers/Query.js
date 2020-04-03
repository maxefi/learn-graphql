const feed = (root, args, context, info) => context.prisma.links();
const link = (root, args, context, info) => {
  console.log({ id: args.id });
  return context.prisma.links({ where: { id: args.id } });
}

module.exports = {
  feed,
  link,
}
