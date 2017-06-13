import React, {Component} from 'react';
import ls from 'local-storage'
import PhotosView from '../views/photos'
import Promise from 'bluebird'
import $ from 'jquery'

export default class PhotosController extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <PhotosView />
    )
  }
}

// PhotosController.displayName = "PhotosController"

PhotosController.propTypes = {

}

PhotosController.defaultProps = {

}
