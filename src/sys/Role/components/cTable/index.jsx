import React from 'react';
import { Table, Row, Col, Input, Button, Modal, message } from 'antd';
import Remove from 'lodash.remove';
import Concat from 'lodash.concat';
import PropTypes from 'prop-types';
import LodashCloneDeep from 'lodash.clonedeep';
import { injectIntl, FormattedMessage } from 'react-intl';
import post from '../../../../common/components/fetch';
import MaintenanceForm from '../RoleModal';
import RoleUserModal from '../RoleUserModal';
import './style.scss';

const Search = Input.Search;
const confirm = Modal.confirm;
class CTable extends React.Component {
  constructor(props) {
    super(props);
    const model = this.props.model;
    this.columns = model.columns;
    this.columns[this.columns.length - 1].render = (text, record) => (
      <div className="table-action">
        <Button style={{ marginRight: '10px' }} size="small" onClick={() => this.handleUserRole(text, record)} ><FormattedMessage id="role_setUsers" /></Button>
        <Button style={{ marginRight: '10px' }} icon="edit" size="small" onClick={() => this.handleEdit(text, record)} />
        <Button icon="delete" size="small" onClick={() => this.handleDelete(text, record)} />
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
      modalVisible: false,
      usersModalVisible: false,
      modalConfirmLoading: false,
      dataSource: [],
      action: '1',
      getUrl: `${process.env.ServiceBaseApi}${model.search}`,
      addUrl: `${process.env.ServiceBaseApi}${model.add}`,
      updateUrl: `${process.env.ServiceBaseApi}${model.update}`,
      deleteUrl: `${process.env.ServiceBaseApi}${model.delete}`,
      getUserUrl: `${process.env.ServiceBaseApi}${model.getUser}`,
      model,
      record: {},
      users: [],
      currentRoleUsers: [],
    };
  }
  componentDidMount() {
    this.getData('');
  }
  onCancel = () => {
    this.setState({ modalVisible: false, usersModalVisible: false });
  }
  getData = (value) => {
    post(this.state.getUrl, value, (res) => {
      if (res.status === 1) {
        this.setState({
          dataSource: res.data.roles,
          users: res.data.users,
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
  handleEdit = (text, record) => {
    this.setState({
      record: LodashCloneDeep(record),
      modalVisible: true,
      usersModalVisible: false,
      action: '2',
    });
  }
  handleDelete = (text, record) => {
    const { dataSource } = this.state;
    const { intl } = this.props;
    const _this = this;
    confirm({
      title: intl.formatMessage({ id: 'role_deleteConfirmTitle' }),
      // content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        post(_this.state.deleteUrl, record.PrincipalId, (res) => {
          if (res.status === 1) {
            Remove(dataSource, value => value.PrincipalId === record.PrincipalId);
            _this.setState({ dataSource });
          } else {
            message.error(res.msg);
          }
        });
      },
      onCancel() {
      },
    });
  }
  handleAdd = () => {
    this.setState({
      modalVisible: true,
      usersModalVisible: false,
      action: '1',
    });
  }
  handleUpdate = () => {
    const { dataSource, action, model } = this.state;
    let dataSourceTemp = dataSource;
    const form = this.form;
    const _this = this;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (action === '1') {
        const record = LodashCloneDeep(model.defaultModel);
        record.Name = values.Name;
        record.NameEn = values.NameEn;
        record.User_Account = values.User_Account;
        record.User_Sex = values.User_Sex;
        record.User_Age = values.User_Age;
        record.User_Email = values.User_Email;
        record.User_Title = values.User_Title;
        record.User_Address = values.User_Address;
        record.Description = values.Description;
        post(this.state.addUrl, record, (res) => {
          if (res.status === 1) {
            const records = [];
            record.key = res.data.PrincipalId;
            record.PrincipalId = res.data.PrincipalId;
            record.ModifyTime = res.data.ModifyTime;
            record.ModifyUser = res.data.ModifyUser;

            records.push(record);
            dataSourceTemp = Concat(records, dataSource);
            this.setState({
              dataSource: dataSourceTemp,
              modalVisible: false,
              modalConfirmLoading: false,
            });
          } else {
            message.error(res.msg);
            this.setState({
              modalConfirmLoading: false,
            });
          }
        });
      } else {
        const { record } = _this.state;
        // const recordTemp = LodashCloneDeep(record);
        record.Name = values.Name;
        record.NameEn = values.NameEn;
        record.User_Account = values.User_Account;
        record.User_Sex = values.User_Sex;
        record.User_Age = values.User_Age;
        record.User_Email = values.User_Email;
        record.User_Title = values.User_Title;
        record.User_Address = values.User_Address;
        record.Description = values.Description;
        post(this.state.updateUrl, record, (res) => {
          if (res.status === 1) {
            record.ModifyTime = res.data.ModifyTime;
            record.ModifyUser = res.data.ModifyUser;
            dataSourceTemp.forEach((value, key) => {
              if (value.PrincipalId === record.PrincipalId) {
                dataSourceTemp[key] = record;
              }
            });
            this.setState({
              dataSource: dataSourceTemp,
              modalVisible: false,
              modalConfirmLoading: false,
            });
          } else {
            this.setState({
              modalConfirmLoading: false,
            });
            message.error(res.msg);
          }
        });
      }
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  handleUserRole = (text, record) => {
    post(this.state.getUserUrl, record.PrincipalId, (res) => {
      if (res.status === 1) {
        this.setState({
          usersModalVisible: true,
          modalVisible: false,
          record,
          currentRoleUsers: res.data.users,
        });
      }
    });
  }
  render() {
    const {
            model,
      dataSource,
      modalVisible,
      record,
      action,
      usersModalVisible,
      users,
      currentRoleUsers,
        } = this.state;
    return (
      <div className="common-table">
        <Row>
          <Col span={4} >
            <Button icon={model.addIcon} size="large" onClick={() => this.handleAdd()} ><FormattedMessage id="add" /></Button>
          </Col>
          <Col span={12} />
          <Col span={8}>
            <Search
              placeholder={this.props.intl.formatMessage({ id: 'role_searchPlaceHolder' })}
              size="large"
              onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={24}>
            <Table {...this.state} columns={this.columns} dataSource={dataSource} />
          </Col>
        </Row>
        {
          modalVisible ?
            <MaintenanceForm
              ref={this.saveFormRef}
              visible={modalVisible}
              onCancel={this.onCancel}
              dataItem={record}
              onOk={this.handleUpdate}
              action={action} />
            :
            ''
        }
        {
          usersModalVisible ?
            <RoleUserModal
              visible={usersModalVisible}
              model={model}
              onCancel={this.onCancel}
              users={users}
              currentRoleUsers={currentRoleUsers}
              role={record} />
            :
            ''
        }
      </div >
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
