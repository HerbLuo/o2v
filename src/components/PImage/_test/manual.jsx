import React from 'react'
import { PImage } from '@lib'
import Image from './image.png'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

export class PImageManuallyTest extends React.Component {
  render () {
    return <div className="test-box">
      <div>
        <center>立即加载</center>
        <PImage srcP={Image} />
      </div>
      <div>
        <center>延后两秒加载</center>
        <PImage srcP={delay(2000).then(() => Image)} />
      </div>
    </div>
  }
}
