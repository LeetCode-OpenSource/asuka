import React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'

import { ResultsTitle } from './results.style'
import { SuiteResult } from '../suites/type'

export interface ResultsProps {
  title: string
  startBench: () => Promise<SuiteResult[]>
}

export class Results extends React.PureComponent<ResultsProps> {

  readonly state = {
    loading: false,
    results: []
  }

  render() {
    return (
      <>
        <ResultsTitle>
          {this.props.title}
          <Button onClick={this.onStartBench} type="primary">Start</Button>
        </ResultsTitle>
        <Table
          dataSource={this.state.results}
          columns={this.getColumns()}
          loading={this.state.loading}
          rowKey="name"
          pagination={false}
        />
      </>
    )
  }

  private onStartBench = () => {
    this.setState({ loading: true }, () => {
      this.props.startBench()
        .then((results) => {
          requestAnimationFrame(() => {
            this.setState({ results, loading: false })
          })
        })
        .catch((e) => {
          console.error(e)
          this.setState({ loading: false })
        })
    })
  }

  private getColumns(): ColumnProps<SuiteResult>[] {
    return [
      {
        title: 'name',
        dataIndex: 'name',
      },
      {
        title: 'ops',
        dataIndex: 'ops',
        render(text) {
          return `${Math.round(Number(text))} ops/s`
        }
      },
      {
        title: 'rme',
        dataIndex: 'rme',
        render(text) {
          return `${Number(text).toFixed(2)} %`
        }
      }
    ]
  }
}
