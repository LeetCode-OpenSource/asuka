const Koa = require('koa');
const Router = require('koa-router')
const graphqlHTTP = require('koa-graphql')

const schema = require('./schemas')

const app = new Koa()
const router = new Router()

router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.use(router.routes()).use(router.allowedMethods())

app.listen('8000')
