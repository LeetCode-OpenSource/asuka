const { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'FeatureNode',
  fields: {
    questionTranslation: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    subscription: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    signUp: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    discuss: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    mockInterview: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    contest: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    store: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    book: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    chinaProblemDiscuss: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    socialProviders: {
      type: GraphQLNonNull(GraphQLString),
    },
    studentFooter: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    enableChannels: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    dangerZone: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    cnJobs: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    cnAddons: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
  },
})
