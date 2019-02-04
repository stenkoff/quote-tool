import * as React from 'react'

import cs from './styles.css'

const NO_VALUE = 'Enter a loan amount to search for products.'
const NO_FILTER_RESULTS = 'No results to show. Please try different filters.'
const NO_SEARCH_RESULTS = 'No results to show. Please try different a different loan amount.'

export default function Message(props) {
  const {error, hasResults, hasValue} = props
  let message
  if (error) {
    message = error
  } else if (!hasValue) {
    message = NO_VALUE
  } else {
    message = hasResults ? NO_FILTER_RESULTS : NO_SEARCH_RESULTS
  }
  return <div className={cs.message}>{message}</div>
}
