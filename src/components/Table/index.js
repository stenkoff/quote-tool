import * as React from 'react'
import cx from 'classnames'

import {getDisplayName, sortResults} from '../../utils'
import Message from '../Message'

import cs from './styles.css'
import TableRow from './TableRow'

export default class Table extends React.Component {
  state = {
    sort: {
      dir: 'asc',
      field: 'lender',
    },
  }

  setSort = sortField => {
    const {dir, field} = this.state.sort
    if (field === sortField) {
      const nextDir = dir === 'asc' ? 'des' : 'asc'
      this.setState({sort: {dir: nextDir, field}})
    } else {
      this.setState({sort: {field: sortField, dir: 'asc'}})
    }
  }

  render() {
    const {metadata, results} = this.props
    const {dir, field} = this.state.sort
    const arrow = dir === 'asc' ? 'downArrow' : 'upArrow'
    const sortedResults = sortResults(dir, field, results)
    return (
      <table className={cs.table}>
        <thead className={cs.header}>
          <tr>
            {metadata.map(meta => (
              <td className={cx(cs.cell, meta === field && cs[arrow])} key={meta}>
                <button onClick={() => this.setSort(meta)} type="button">
                  {getDisplayName(meta)}
                </button>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.length ? (
            sortedResults.map(result => (
              <TableRow
                key={`${result.interest_rate}-${result.monthly_payment}`}
                metadata={metadata}
                result={result}
              />
            ))
          ) : (
            <Message hasResults hasValue />
          )}
        </tbody>
      </table>
    )
  }
}
