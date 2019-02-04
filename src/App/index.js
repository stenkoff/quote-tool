import * as React from 'react'

import Input from '../components/Input'
import Message from '../components/Message'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'
import fetchQuotes from '../api/quotes'
import {filterResults} from '../utils'

import cs from './styles.css'

const DEFAULT_ERROR = 'An error occurred. Please try again.'
const META = ['lender', 'interest_rate', 'loan_term', 'monthly_payment', 'rate_type']

export default class App extends React.Component {
  state = {
    filters: {},
    results: [],
    value: '',
  }

  getQuotes = value => {
    const amount = parseInt(value, 10)
    if (Number.isNaN(amount)) return
    fetchQuotes(amount)
      .then(results => {
        this.setState({results, value, filters: {}})
      })
      .catch(error => {
        this.setState({error: (error && error.message) || DEFAULT_ERROR})
      })
  }

  updateFilters = (field, value) => {
    if (!this.state.filters[field]) {
      this.setState(prevState => ({filters: {...prevState.filters, [field]: new Set([value])}}))
    } else {
      this.setState(prevState => {
        const {filters} = prevState
        const nextFilter = new Set(filters[field])
        if (nextFilter.has(value)) nextFilter.delete(value)
        else nextFilter.add(value)
        return {filters: {...filters, [field]: nextFilter}}
      })
    }
  }

  render() {
    const {error, filters, results, value} = this.state
    const hasResults = !error && results && results.length
    return (
      <div className={cs.app}>
        <div className={cs.header}>
          <h1 className={cs.title}>Quote Tool</h1>
          <Input value={value} onSearch={this.getQuotes} />
        </div>
        <div className={cs.body}>
          <Sidebar onFilter={this.updateFilters} metadata={META} results={results} />
          <div className={cs.content}>
            {hasResults ? (
              <Table metadata={META} results={filterResults(filters, results)} />
            ) : (
              <Message error={error} hasResults={false} hasValue={!!value} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
