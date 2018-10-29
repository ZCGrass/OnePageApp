import React from 'react';
import { Table, Row, Col, Input, Button, message } from 'antd';
// import Remove from 'lodash.remove';
// import Concat from 'lodash.concat';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import post from '../../../../common/components/fetch';
import MenuModal from '../MenuModal';
import './style.scss';

const { Search } = Input;
// const confirm = Modal.confirm;
class CTable extends React.Component {
  constructor(props) {
    super(props);
    const { model } = this.props;
    this.columns = model.columns;
    this.columns[this.columns.length - 1].render = (text, record) => (
      <div className="table-action">
        <Button size="small" onClick={() => this.handleSetPermissions(text, record)}><FormattedMessage id="fa_Authority" /></Button>
      </div>
    );
    message.config({
      top: 100,
      duration: 3,
    });
    this.state = {
      bordered: true,
      loading: true,
      pagination: true,
      size: 'small',
      scroll: undefined,
      visible: false,
      dataSource: [],
      getUrl: `${process.env.ServiceBaseApi}${model.search}`,
      updateUrl: `${process.env.ServiceBaseApi}${model.update}`,
      model,
      record: {},
    };
  }
  componentDidMount() {
    this.getData('');
  }
  onCancel = () => {
    this.setState({ visible: false });
  }
  getData = (value) => {
    post(this.state.getUrl, value, (res) => {
      if (res.status === 1) {
        this.setState({
          dataSource: res.data.uersAndRoles,
          treeNodes: res.data.menus.treeNodes,
          loading: false,
        });
      }
    });
  }
  handleSearch = (value) => {
    this.setState({ loading: true }, () => {
      this.getData(value);
    });
  }
  handleSetPermissions = (text, record) => {
    this.setState({ record, visible: true });
  }
  handleUpdate = () => {
  }
  render() {
    const {
            visible,
      record,
      treeNodes,
      model,
        } = this.state;

    return (
      <div className="common-table">
        <Row>
          <Col span={16} />
          <Col span={8}>
            <Search
              placeholder={this.props.intl.formatMessage({ id: 'fa_searchPlaceHolder' })}
              size="large"
              onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={24}>
            <Table {...this.state} columns={this.columns} dataSource={this.state.dataSource} />
          </Col>
        </Row>
        <MenuModal
          model={model}
          visible={visible}
          record={record}
          treeNodes={treeNodes}
          onCancel={this.onCancel} />
      </div>
    );
  }
}
CTable.propTypes = {
  model: PropTypes.object,
  intl: PropTypes.object,
};
export default injectIntl(CTable, {
  withRef: true,
});
