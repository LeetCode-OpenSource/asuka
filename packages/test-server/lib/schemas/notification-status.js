const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'NotificationStatus',
  fields: {
    lastModified: {
      type: GraphQLNonNull(GraphQLString),
    },
    numUnread: {
      type: GraphQLNonNull(GraphQLInt),
    },
  },
})
