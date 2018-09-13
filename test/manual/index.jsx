import './styles.less'
import React from 'react'
import ReactDom from 'react-dom'
/** @type Array */
import componentNames from './components.json'
import { PTextManuallyTest } from '../../src/components/PText/_test/manual.jsx'
import { PImageManuallyTest } from '../../src/components/PImage/_test/manual.jsx'

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
    const router = {
      '': PImageManuallyTest,
      PImage: PImageManuallyTest,
      PText: PTextManuallyTest
    }
    const component = router[this.state.pageName] || PImageManuallyTest
    return React.createElement(component)
  }
}

ReactDom.render(
  <Content />,
  document.getElementById('content')
)
