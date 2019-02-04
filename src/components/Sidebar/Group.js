import * as React from 'react'

import {comparator, getDisplayName} from '../../utils'

import cs from './styles.css'

const DOWN_TRIANGLE = '\u25BE'
const RIGHT_TRIANGLE = '\u25B8'

export default class Group extends React.Component {
  state = {
    options: [],
    showGroupOptions: false,
  }

  componentDidUpdate(prevProps) {
    const {results} = this.props
    if (results !== prevProps.results) {
      this.getOptions()
    }
  }

  handleChange = event => {
    const {value} = event.target
    const {groupName, onFilter} = this.props
    onFilter(groupName, value)
  }

  handleClick = () => {
    this.setState(prevState => ({showGroupOptions: !prevState.showGroupOptions}))
  }

  getOptions = () => {
    const {groupName, results} = this.props
    const optionsSet = new Set()
    if (groupName === 'lender') {
      results.map(result => optionsSet.add(result.lender.name))
    } else {
      results.map(result => optionsSet.add(result[groupName]))
    }
    const options = Array.from(optionsSet).sort(comparator)
    this.setState({options})
  }

  render() {
    const {groupName, results} = this.props
    const {options, showGroupOptions} = this.state
    return (
      <React.Fragment>
        <button
          className={cs.group}
          disabled={!results || !results.length}
          onClick={this.handleClick}
          type="button"
        >
          <span className={cs.triangle}>{showGroupOptions ? DOWN_TRIANGLE : RIGHT_TRIANGLE}</span>
          {getDisplayName(groupName)}
        </button>
        {showGroupOptions &&
          options.map(option => (
            <div className={cs.option} key={option}>
              <input onChange={this.handleChange} type="checkbox" value={option} />
              {option}
            </div>
          ))}
      </React.Fragment>
    )
  }
}
