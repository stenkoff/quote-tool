import * as React from 'react'

import cs from './styles.css'

const ENTER = 'Enter'
const SEARCH = '\u26B2'

export default class Input extends React.Component {
  state = {
    value: '',
  }

  handleChange = event => {
    this.setState({value: event.target.value})
  }

  handleClick = () => {
    const {value} = this.state
    const {onSearch, value: prevValue} = this.props
    if (value !== prevValue) {
      onSearch(value)
    }
  }

  handleKeyDown = event => {
    const {value} = this.state
    const {onSearch, value: prevValue} = this.props
    if (event.key === ENTER && value !== prevValue) {
      onSearch(value)
    }
  }

  render() {
    return (
      <div className={cs.wrapper}>
        <input
          className={cs.input}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          placeholder="Loan amount"
        />
        <button className={cs.search} onClick={this.handleClick} type="button">
          {SEARCH}
        </button>
      </div>
    )
  }
}
