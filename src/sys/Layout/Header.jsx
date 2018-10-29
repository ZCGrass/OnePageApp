import ReactDOM from 'react-dom';
import React from 'react';
import MainContent from './components/MainContent';
import Language from './config/language';
import Translate from '../../common/components/Translate';
import { queryString } from '../../common/utils';
import './Header.scss';

export default class HomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: queryString().lang || null,
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <Translate
        language={this.state.language}
        template={() => <MainContent />}
        messages={Language} />);
  }
}
ReactDOM.render(<HomeContent />, document.getElementById('app'));
