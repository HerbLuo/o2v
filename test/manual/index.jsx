import './styles.less'
import '@lib/o2v.css'
import React from 'react'
import ReactDom from 'react-dom'
/** @type Array */
import componentNames from './components.json'
import { PLayout } from '@lib'

class Content extends React.Component {
  _getPageNameFromLocation = () => location.pathname.substring(1)

  state = {
    pageName: this._getPageNameFromLocation() || 'PImage'
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
    // const component = router[this.state.pageName] || PImageTest
    const componentName = this.state.pageName
    const module = import(`../../src/components/${componentName}/_test/index.jsx`)
      .then(m => m.default)

    return <PLayout>
      <PLayout className="test-layout" p={module} onResolve={Test => <Test />} />
    </PLayout>
  }
}

ReactDom.render(
  <Content />,
  document.getElementById('content')
)
