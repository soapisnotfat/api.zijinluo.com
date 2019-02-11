import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

export const defaultSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'default_query',
    fields: {
      data: {
        type: GraphQLString,
        resolve: () => 'hello world'
      }
    }
  })
});
