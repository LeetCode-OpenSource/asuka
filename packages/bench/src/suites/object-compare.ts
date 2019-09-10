import { Suite } from 'benchmark'
import { SuiteResult } from './type'
import { jsonSchema } from './json-schema'
import { fetchGlobalData } from './fetch-global-data'

const compile = require('fast-json-stringify')
const fastDeepEqual = require('fast-deep-equal')

const fastStringify = compile(jsonSchema)

const suite = new Suite()

export const runObjectCompareSuites = async () => {
  const response = await fetchGlobalData()
  const resp = await response.json()
  const expect = { ...resp }
  return new Promise<SuiteResult[]>((resolve) => {
    const results: SuiteResult[] = []
    suite
      .add('JSON#stringify', () => {
        JSON.stringify(resp) === JSON.stringify(expect)
      })
      .add('fast-deep-equal', () => {
        fastDeepEqual(resp, expect)
      })
      .add('fast-json-stringify', () => {
        fastStringify(resp) === fastStringify(expect)
      })
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
