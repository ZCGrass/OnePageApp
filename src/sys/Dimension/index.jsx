import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { queryString } from '../../common/utils';
import CTree from '../../common/components/CTree';
import Model from './config';
import MaintenanceForm from './components/MaintenanceForm';
import Language from '../../common/components/language';
import Translate from '../../common/components/Translate';
import './style.scss';


export default class DimContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultNode: queryString().dim_id || '',
      language: queryString().lang || null,
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
    return (
      <Translate
        language={this.state.language}
        template={() => <CTree model={Model} renderMaintenanceForm={this.renderMaintenanceForm} defaultNode={this.state.defaultNode} />}
        messages={Language} />);
  }
}
ReactDOM.render(<DimContent />, document.getElementById('app'));
