import 'babel-polyfill';
import React from 'react';
import CTable from './components/CTable';
import Model from './config';
import './style.scss';

export default class RoleContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (<CTable model={Model} />);
  }
}
