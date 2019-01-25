import React from 'react'
import { render } from 'react-dom'

import { runJsonParseSuites } from './suites'
import { Results } from './components/results.component'

import 'antd/dist/antd.css'

class Main extends React.PureComponent {
  render() {
    return (
      <>
        <Results startBench={runJsonParseSuites} title="JSON Parse" />
      </>
    )
  }
}

render(<Main />, document.querySelector('#app'))
