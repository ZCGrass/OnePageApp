import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import BasicLayout from '../Layout/BasicLayout';
import Translate from '../../common/components/Translate';
import { queryString } from '../../common/utils';
// import GlobalFooter from '../GlobalFooter';
import Language from '../../common/components/language';
import './style.scss';

export default class HomeContent extends React.Component {
  constructor(props) {
    super(props);
    const language = queryString().lang || null;
    let languageTemp = language;
    let languageWithoutRegionCode = language;
    if (!language) {
      languageTemp = (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage;
      languageWithoutRegionCode = languageTemp.toLowerCase().split(/[_-]+/)[0];
    }
    document.title = '首页';
    this.state = {
      language: languageWithoutRegionCode,
    };
  }
  componentDidMount() {
  }
  handleChangeLanguage = (language) => {
    this.setState({ language });
  }
  render() {
    return (
      <Translate
        language={this.state.language}
        template={() => (<BasicLayout language={this.state.language} changeLanguage={this.handleChangeLanguage} />)}
        messages={Language} />
    );
  }
}
ReactDOM.render(<HomeContent />, document.getElementById('app'));
