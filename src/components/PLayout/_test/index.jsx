import React from 'react'
import { PLayout } from '@lib'
import { delay } from '../../../utils/delay4test'

export default class PLayoutTest extends React.Component {
  render () {
    return <div>
      <PLayout p={delay(2000).then(() => '2秒后出现')} onResolve={val => <p>{val}</p>}/>
    </div>
  }
}
