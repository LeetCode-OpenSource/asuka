import { Suite } from 'benchmark'
import { SuiteResult } from './type'
import { jsonSchema } from './json-schema'
import { fetchGlobalData } from './fetch-global-data'
const compile = require('turbo-json-parse')

const turboParse = compile(jsonSchema)

const suite = new Suite()

export const runJsonParseSuites = async () => {
  const response = await fetchGlobalData()

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
