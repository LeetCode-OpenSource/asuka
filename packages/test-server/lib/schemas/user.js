const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql')
const NotificationStatus = require('./notification-status')

module.exports = new GraphQLObjectType({
  name: 'MeNode',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    isSignedIn: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    isAdmin: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    isStaff: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    isSuperuser: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    isTranslator: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    isPremium: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    isVerified: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    checkedInToday: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    realName: {
      type: GraphQLNonNull(GraphQLString),
    },
    userSlug: {
      type: GraphQLNonNull(GraphQLString),
    },
    avatar: {
      type: GraphQLNonNull(GraphQLString),
    },
    optedIn: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    requestRegion: {
      type: GraphQLNonNull(GraphQLString),
    },
    region: {
      type: GraphQLNonNull(GraphQLString),
    },
    activeSessionId: {
      type: GraphQLNonNull(GraphQLString),
    },
    permissions: {
      type: GraphQLNonNull(GraphQLList(GraphQLString)),
    },
    notificationStatus: {
      type: NotificationStatus,
    },
    completedFeatureGuides: {
      type: GraphQLNonNull(GraphQLList(GraphQLString)),
    },
  },
})
