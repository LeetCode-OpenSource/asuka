import React from 'react'
import { render } from 'react-dom'

import { runJsonParseSuites, runObjectCompareSuites } from './suites'
import { Results } from './components/results.component'

import 'antd/dist/antd.css'

class Main extends React.PureComponent {
  render() {
    return (
      <>
        <Results startBench={runJsonParseSuites} title="JSON Parse" />
        <Results startBench={runObjectCompareSuites} title="Object Compare" />
      </>
    )
  }
}

render(<Main />, document.querySelector('#app'))
