import 'babel-polyfill';
import React from 'react';
// import { Router, Route, hashHistory } from 'react-router';
// import User from './components/Main';
import CTable from './components/CTable';
import MaintenanceForm from './components/UserModal';
import Model from './config';
// import Language from './config/language';
// import Translate from '../../common/components/Translate';
// import { queryString } from '../../common/utils';
import './style.scss';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // language: queryString().lang || null,
    };
  }
  componentDidMount() { }
  renderForm = (saveFormRef, visible, onCancel, dataItem, onOk, action) => (
    <MaintenanceForm
      ref={form => saveFormRef(form)}
      visible={visible}
      onCancel={onCancel}
      dataItem={dataItem}
      onOk={onOk}
      action={action} />);
  render() {
    return (<CTable model={Model} renderForm={this.renderForm} />);
  }
}
