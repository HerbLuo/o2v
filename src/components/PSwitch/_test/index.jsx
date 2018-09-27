import React from 'react'
import { PSwitch } from '@lib'

export default class PSwitchTest extends React.Component {
  state = {
    checked: true
  }

  constructor (props) {
    super(props)
    setTimeout(() => {
      this.setState({
        checked: false
      })
    }, 5000)
  }

  render () {
    return <PSwitch
      className="___warning_dev"
      checked={this.state.checked}
      style={{marginTop: '10px'}}
    />
  }
}
