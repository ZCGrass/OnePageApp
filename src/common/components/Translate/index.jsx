import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import PropTypes from 'prop-types';

addLocaleData([...en, ...zh]);
export default class Translate extends Component {
  constructor(props) {
    super(props);
    const { template, language, messages } = this.props;
    let languageTemp = language;
    let languageWithoutRegionCode = language;
    if (!language) {
      languageTemp = (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage;
      languageWithoutRegionCode = languageTemp.toLowerCase().split(/[_-]+/)[0];
    }
    this.state = {
      language: languageWithoutRegionCode,
      template,
      messages: messages[languageWithoutRegionCode],
    };
  }
  componentWillReceiveProps(nextProps) {
    const { template, language, messages } = nextProps;
    let languageTemp = language;
    let languageWithoutRegionCode = language;
    if (!language) {
      languageTemp = (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage;
      languageWithoutRegionCode = languageTemp.toLowerCase().split(/[_-]+/)[0];
    }
    this.setState({
      language: languageWithoutRegionCode,
      template,
      messages: messages[languageWithoutRegionCode],
    });
  }
  render() {
    const {
      language,
      messages,
      template,
    } = this.state;
    return (
      <IntlProvider locale={language} messages={messages}>
        {template()}
      </IntlProvider>
    );
  }
}
Translate.propTypes = {
  template: PropTypes.func,
  language: PropTypes.string,
  messages: PropTypes.object,
};
