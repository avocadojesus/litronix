import React, {Component} from 'react';
import ls from 'local-storage'
import HomeView from '../views/home'
import Promise from 'bluebird'
import $ from 'jquery'

export default class HomeController extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <HomeView />
    )
  }
}

// HomeController.displayName = "HomeController"

HomeController.propTypes = {

}

HomeController.defaultProps = {

}
