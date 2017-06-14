import React, {Component} from 'react';
import ls from 'local-storage'
import VideosView from '../views/videos'
import Promise from 'bluebird'
import $ from 'jquery'

export default class VideosController extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <VideosView />
    )
  }
}

// VideosController.displayName = "VideosController"

VideosController.propTypes = {

}

VideosController.defaultProps = {

}
