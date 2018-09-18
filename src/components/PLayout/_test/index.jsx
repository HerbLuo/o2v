import React from 'react'
import { PLayout } from '@lib'
import { delay } from '../../../utils/delay4test'

export default class PLayoutTest extends React.Component {
  render () {
    return <div>
      <PLayout>立即出现</PLayout>
      <PLayout p={delay(1000).then(() => '1秒后出现')} onResolve={val => <p>{val}</p>}/>
    </div>
  }
}
