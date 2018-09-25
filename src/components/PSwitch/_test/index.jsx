import React from 'react'
import { PSwitch } from '@lib'

export default class PSwitchTest extends React.Component {
  render () {
    return <PSwitch
      className="dev"
      checked={true}
      style={{marginTop: '10px'}}
    />
  }
}
