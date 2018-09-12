import React from 'react'
import ReactDom from 'react-dom'
import { PImageManuallyTest } from '../../src/components/PImage/_test/manual.jsx'
/** @type Array */
import componentNames from './components.json'
import './styles.less'

class Content extends React.Component {
  render () {
    return <div className="container">
      {this.renderSelect()}
      <PImageManuallyTest />
    </div>
  }

  // noinspection JSMethodCanBeStatic
  renderSelect () {
    return <select>
      {componentNames.map(componentName =>
        <option key={componentName}>{componentName}</option>)}
    </select>
  }
}

ReactDom.render(
  <Content />,
  document.getElementById('content')
)
