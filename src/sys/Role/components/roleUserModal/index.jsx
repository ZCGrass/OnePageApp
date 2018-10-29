import React from 'react';
import { Modal, Transfer, Button, message } from 'antd';
import PropTypes from 'prop-types';
import LodashMap from 'lodash.map';
// import LodashJoin from 'lodash.join';
import { FormattedMessage } from 'react-intl';
import post from '../../../../common/components/fetch';
import './style.scss';

export default class RoleUserModal extends React.Component {
  constructor(props) {
    super(props);
    message.config({
      top: 100,
      duration: 3,
    });
    const model = this.props.model;
    this.state = {
      setUserUrl: `${process.env.ServiceBaseApi}${model.setUser}`,
      visible: this.props.visible,
      users: this.props.users,
      currentRoleUsers: this.props.currentRoleUsers,
      role: this.props.role,
      targetKeys: LodashMap(this.props.currentRoleUsers, 'key'),
      model,
      onCancel: this.props.onCancel,
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      currentRoleUsers: nextProps.currentRoleUsers || this.state.currentRoleUsers,
      users: nextProps.users || this.state.users,
      role: nextProps.role || this.state.role,
      model: nextProps.model || this.state.model,
      targetKeys: LodashMap(nextProps.currentRoleUsers || this.state.currentRoleUsers, 'key'),
    });
  }
  handleChange = (targetKeys) => {
    console.log(targetKeys);
    this.setState({ targetKeys });
  }
  handleSetRoleUsers = () => {
    const { role, targetKeys } = this.state;
    const param = {
      role_Id: role.PrincipalId,
      users: targetKeys.join(','),
    };
    post(this.state.setUserUrl, param, (res) => {
      if (res.status === 1) {
        this.setState({
          currentRoleUsers: res.data,
          visible: false,
        });
        message.success('保存成功！');
      }
    });
  }
  renderFooter = () => (
    <Button
      size="small"
      style={{ float: 'right', margin: 5 }}
      onClick={this.getMock}>
      reload
        </Button>);
  render() {
    const {
            visible,
      users,
      targetKeys,
      onCancel,
        } = this.state;
    // const value = LodashJoin(LodashMap(currentRoleUsers, ''), ';');
    return (
      <Modal
        className="user-modal"
        visible={visible}
        title={<FormattedMessage id="role_setUsers" />}
        okText={<FormattedMessage id="save" />}
        cancelText={<FormattedMessage id="cancel" />}
        onCancel={onCancel}
        onOk={this.handleSetRoleUsers}>
        <Transfer
          dataSource={users}
          showSearch
          listStyle={{
            width: 250,
            height: 300,
          }}
          // operations={['to right', 'to left']}
          targetKeys={targetKeys}
          onChange={this.handleChange}
          render={item => `${item.Name}-${item.User_Account}`} />
      </Modal>
    );
  }
}
RoleUserModal.propTypes = {
  model: PropTypes.object,
  visible: PropTypes.bool,
  users: PropTypes.array,
  currentRoleUsers: PropTypes.array,
  role: PropTypes.object,
  onCancel: PropTypes.func,
};
