import './styles.less'
import '@lib/o2v.css'
import React from 'react'
import ReactDom from 'react-dom'
/** @type Array */
import componentNames from './components.json'
import { PLayout } from '@lib'
import { delay } from '../../src/utils/delay4test'

class Content extends React.Component {
  _getPageNameFromLocation = () => location.pathname.substring(1)

  state = {
    pageName: this._getPageNameFromLocation()
  }

  setPageNameStateFromLocation = () => {
    this.setState({
      pageName: this._getPageNameFromLocation()
    })
  }

  componentDidMount () {
    window.onpopstate = this.setPageNameStateFromLocation
  }

  onSelectChange = (e) => {
    history.pushState({}, '', e.target.value)
    this.setPageNameStateFromLocation()
  }

  render () {
    return <div className="container">
      {this.renderSelect()}
      {this.renderContentRouter()}
    </div>
  }

  renderSelect () {
    return <select onChange={this.onSelectChange} value={this.state.pageName}>
      {componentNames.map(componentName =>
        <option key={componentName}>{componentName}</option>)}
    </select>
  }

  renderContentRouter () {
    // const router = {
    //   '': PImageTest,
    //   PImage: PImageTest,
    //   PText: PTextTest
    // }
    // const component = router[this.state.pageName] || PImageTest
    return <PLayout>
      123456
      <PLayout p={delay(2000).then(() => 'async data')}>
        {({resolved}) => (
          <div>{resolved}</div>
        )}
      </PLayout>
    </PLayout>
  }
}

class PromiseLayout extends React.Component {
  state = {}
  render () {

  }
}

ReactDom.render(
  <Content />,
  document.getElementById('content')
)
