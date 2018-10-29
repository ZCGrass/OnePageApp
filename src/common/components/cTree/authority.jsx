import React from 'react';
import { Modal, Transfer, message, Icon } from 'antd';
import PropTypes from 'prop-types';
import LodashMap from 'lodash.map';
import { FormattedMessage } from 'react-intl';
// import LodashJoin from 'lodash.join';
import post from '../fetch';
import './style.scss';

export default class AuthorityModal extends React.Component {
  constructor(props) {
    super(props);
    message.config({
      top: 100,
      duration: 3,
    });
    const {
            model,
      visible,
      principals,
      currentPrincipals,
      onCancel,
      currentNode,
      rootNode,
         } = this.props;
    this.state = {
      setPrincipalsUrl: `${process.env.ServiceBaseApi}${model.setPrincipals}`,
      visible,
      principals,
      currentPrincipals,
      currentNode,
      rootNode,
      targetKeys: LodashMap(currentPrincipals, 'key'),
      model,
      onCancel,
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    const {
            visible,
      currentPrincipals,
      principals,
      currentNode,
      rootNode,
      model,
        } = nextProps;
    this.setState({
      visible,
      currentPrincipals: currentPrincipals || this.state.currentPrincipals,
      principals: principals || this.state.principals,
      currentNode: currentNode || this.state.currentNode,
      rootNode: rootNode || this.state.rootNode,
      model: model || this.state.model,
      targetKeys: LodashMap(currentPrincipals || this.state.currentPrincipals, 'key'),
    });
  }
  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }
  filterOption = (inputValue, option) => {
    let filterValue = inputValue;
    if (inputValue) {
      switch (inputValue.toLowerCase()) {
        case '用户':
          filterValue = 'user';
          break;
        case '角色':
          filterValue = 'role';
          break;
        default:
          break;
      }
    }
    return option.Name.indexOf(filterValue) > -1 || option.PrincipalType.indexOf(filterValue) > -1;
  };
  handleSetPrincipals = () => {
    const {
            rootNode,
      currentNode,
      targetKeys,
      onCancel,
        } = this.state;
    const param = {
      rootNode,
      currentNode,
      principals: targetKeys,
    };
    post(this.state.setPrincipalsUrl, param, (res) => {
      if (res.status === 1) {
        onCancel();
        message.success('保存成功！');
      }
    });
  }
  render() {
    const {
            visible,
      principals,
      targetKeys,
      onCancel,
        } = this.state;
    return (
      <Modal
        className="authority-modal"
        visible={visible}
        title={<FormattedMessage id="Authority" />}
        okText={<FormattedMessage id="save" />}
        cancelText={<FormattedMessage id="cancel" />}
        onCancel={onCancel}
        onOk={this.handleSetPrincipals}>
        <Transfer
          dataSource={principals}
          showSearch
          listStyle={{
            width: 250,
            height: 300,
          }}
          // operations={['to right', 'to left']}
          targetKeys={targetKeys}
          titles={[<FormattedMessage id="Unauthorized" />, <FormattedMessage id="Authorized" />]}
          onChange={this.handleChange}
          filterOption={this.filterOption}
          render={(item) => {
            if (item.PrincipalType === 'role') {
              return (<span><Icon type="team" style={{ fontSize: 12 }} />{item.Name}</span>);
            }
            return (<span><Icon type="user" style={{ fontSize: 12 }} />{item.Name}</span>);
          }} />
      </Modal>
    );
  }
}
AuthorityModal.propTypes = {
  model: PropTypes.object,
  visible: PropTypes.bool,
  principals: PropTypes.array,
  currentPrincipals: PropTypes.array,
  currentNode: PropTypes.string,
  rootNode: PropTypes.string,
  onCancel: PropTypes.func,
};
