import * as React from 'react'

import cs from './styles.css'
import Group from './Group'

export default function Sidebar(props) {
  const {metadata, onFilter, results} = props
  return (
    <div className={cs.sidebar}>
      <h1 className={cs.header}>Filters</h1>
      {metadata.map(meta => (
        <Group onFilter={onFilter} key={meta} groupName={meta} results={results} />
      ))}
    </div>
  )
}
