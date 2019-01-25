const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const MeNode = require('./user')
const FeatureNode = require('./feature')
const { fixtureMeNode, fixtureFeatureNode } = require('../fixtures')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      userStatus: {
        type: MeNode,
        resolve() {
          return fixtureMeNode
        },
      },
      feature: {
        type: FeatureNode,
        resolve() {
          return fixtureFeatureNode
        },
      },
    },
  }),
})
