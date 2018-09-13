import React from 'react'
import { PText } from '@lib/index.esm'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

export class PTextManuallyTest extends React.Component {
  render () {
    return <div style={{display: 'flex', flexDirection: 'column'}}>
      <PText>立即加载的文字</PText>
      <PText>{delay(2000).then(() => '两秒后加载的文字')}</PText>
    </div>
  }
}
