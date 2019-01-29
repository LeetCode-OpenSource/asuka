import { Suite } from 'benchmark'
import { SuiteResult } from './type'
import { jsonSchema } from './json-schema'
const compile = require('turbo-json-parse')

const turboParse = compile(jsonSchema)

const suite = new Suite()

const query = `query globalData {
  feature {
    questionTranslation
    subscription
    signUp
    discuss
    mockInterview
    contest
    store
    book
    chinaProblemDiscuss
    socialProviders
    studentFooter
    enableChannels
    dangerZone
    cnJobs
    cnAddons
    __typename
  }
  userStatus {
    isSignedIn
    isAdmin
    isStaff
    isSuperuser
    isTranslator
    isPremium
    isVerified
    checkedInToday
    username
    realName
    userSlug
    avatar
    optedIn
    requestRegion
    region
    activeSessionId
    permissions
    notificationStatus {
      lastModified
      numUnread
      __typename
    }
    completedFeatureGuides
    __typename
  }
}
`

export const runJsonParseSuites = async () => {
  const response = await fetch('/graphql', {
    body: JSON.stringify({
      query,
      variables: null,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  const { parse: wasmParse } = await import('@asuka/json-parse-wasm')
  return new Promise<SuiteResult[]>((resolve) => {
    const results: SuiteResult[] = []
    suite
      .add(
        'wasm parse',
        (deferred: any) => {
          const resp = response.clone()
          resp
            .body!.getReader()
            .read()
            .then((d) => {
              wasmParse(d.value)
              deferred.resolve()
            })
        },
        {
          defer: true,
        },
      )
      .add(
        'Native fetch#json',
        (deferred: any) => {
          const resp = response.clone()
          return resp.json().then(() => deferred.resolve())
        },
        {
          defer: true,
        },
      )
      .add(
        'fetch#text and JSON.parse',
        (deferred: any) => {
          const resp = response.clone()
          return resp.text().then((res) => {
            JSON.parse(res)
            deferred.resolve()
          })
        },
        {
          defer: true,
        },
      )
      .add(
        'fetch#text turbo',
        (deferred: any) => {
          const resp = response.clone()
          return resp.text().then((res) => {
            turboParse(res)
            deferred.resolve()
          })
        },
        {
          defer: true,
        },
      )
      .on('cycle', function(event: any) {
        results.push({
          ops: event.target.hz,
          name: event.target.name,
          rme: event.target.stats.rme,
        })
      })
      .on('complete', function(this: Suite) {
        console.info('Fastest is ' + this.filter('fastest').map((sui: any) => sui.name))
        resolve(results)
      })
      .run({
        async: true,
      })
  })
}
