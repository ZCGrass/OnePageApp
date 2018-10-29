import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import CTable from './components/CTable';
import Model from './config';
import Language from '../../common/components/language';
import Translate from '../../common/components/Translate';
import { queryString } from '../../common/utils';
import './style.scss';

export default class RoleContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: queryString().lang || null,
    };
  }
  componentDidMount() {
  }
  render() {
    return (<Translate
      language={this.state.language}
      template={() => <CTable model={Model} />}
      messages={Language} />);
  }
}
ReactDOM.render(<RoleContent />, document.getElementById('app'));
