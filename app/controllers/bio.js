import React, {Component} from 'react';
import ls from 'local-storage'
import BioView from '../views/bio'
import Promise from 'bluebird'
import $ from 'jquery'

export default class BioController extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <BioView />
    )
  }
}

BioController.propTypes = {

}

BioController.defaultProps = {

}
