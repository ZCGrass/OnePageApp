import 'babel-polyfill';
import React from 'react';
import { queryString } from '../../common/utils';
import CTree from '../../common/components/CTree';
import Model from './config';
import MaintenanceForm from './components/MaintenanceForm';
import './style.scss';


export default class Dimension extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultNode: queryString().dim_id || '',
    };
  }
  componentDidMount() {
  }
  renderMaintenanceForm = (saveFormRef, popupVisible, onCancel, dataItem, onOk, action) => (
    <MaintenanceForm
      ref={saveFormRef}
      visible={popupVisible}
      onCancel={onCancel}
      dataItem={dataItem}
      onOk={onOk}
      action={action} />);
  render() {
    return (<CTree model={Model} renderMaintenanceForm={this.renderMaintenanceForm} defaultNode={this.state.defaultNode} />);
  }
}

