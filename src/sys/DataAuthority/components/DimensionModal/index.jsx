import React from 'react';
import { Modal, Select, message, Tree } from 'antd';
import PropTypes from 'prop-types';
import LodashMap from 'lodash.map';
// import LodashJoin from 'lodash.join';
import LodashFind from 'lodash.find';
import LodashFilter from 'lodash.filter';
import LodashUniq from 'lodash.uniq';
import LodashForeach from 'lodash.foreach';
import LodashRemove from 'lodash.remove';
import { FormattedMessage } from 'react-intl';
import post from '../../../../common/components/fetch';
import './style.scss';

const { Option } = Select;
const { TreeNode } = Tree;

export default class DimensionModal extends React.Component {
  constructor(props) {
    super(props);
    message.config({
      top: 100,
      duration: 3,
    });
    const {
            model,
      record,
      visible,
      onCancel,
      treeNodes,
        } = this.props;
    let dataSource = [];
    let rootNode = '';
    let rootNodeName = '';
    if (treeNodes && treeNodes.length > 0) {
      dataSource = treeNodes[0].nodes;
      rootNodeName = treeNodes[0].rootNodeName;
      rootNode = treeNodes[0].rootNode;
    }
    this.state = {
      setPermissionUrl: `${process.env.ServiceBaseApi}${model.setPermission}`,
      getPermissionUrl: `${process.env.ServiceBaseApi}${model.getPermission}`,
      visible,
      treeNodes: treeNodes || [],
      rootNode,
      selectValue: rootNode,
      rootNodeName,
      dataSource,
      record,
      model,
      onCancel,
      expandedKeys: [],
      checkedKeys: [],
    };
  }
  componentDidMount() {
    this.Get();
  }
  componentWillReceiveProps(nextProps) {
    let dataSource = [];
    let rootNode = '';
    let rootNodeName = '';
    const treeNodes = nextProps.treeNodes || [];
    if (treeNodes && treeNodes.length > 0) {
      dataSource = treeNodes[0].nodes;
      rootNodeName = treeNodes[0].rootNodeName;
      rootNode = treeNodes[0].rootNode;
    }
    this.setState({
      visible: nextProps.visible,
      treeNodes,
      rootNode,
      selectValue: rootNode,
      rootNodeName,
      dataSource,
      record: nextProps.record || this.state.record,
      model: nextProps.model || this.state.model,
    }, () => {
      this.Get();
    });
  }
  onRemoveSubNodeExpandeKeys = (expandedKeys, expandKey) => {
    const { dataSource } = this.state;
    const _this = this;
    const list = LodashFilter(dataSource, value => (value.ParentNode === expandKey && value.ParentNode !== value.PrincipalId));
    if (list.length > 0) {
      LodashForeach(list, (n) => {
        LodashRemove(expandedKeys, x => x === n.key);
        _this.onRemoveSubNodeExpandeKeys(expandedKeys, n.key);
      });
    }
    return expandedKeys;
  }
  onExpand = (keys, info) => {
    const { expandedKeys } = this.state;
    let expandedKeysTemp = expandedKeys;
    const expandKey = info.node.props.eventKey;
    if (info.expanded) {
      expandedKeysTemp.push(expandKey);
    } else {
      LodashRemove(expandedKeys, x => x === expandKey);
      expandedKeysTemp = this.onRemoveSubNodeExpandeKeys(expandedKeys, expandKey);
    }
    this.setState({
      expandedKeys: LodashUniq(expandedKeysTemp, true),
    });
  }
  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  }
  // 展示树子节点
  getTreeNode = (dataSource, ParentNode) => {
    const nodeDatas = LodashFilter(dataSource, value => (value.ParentNode === ParentNode && value.ParentNode !== value.PrincipalId)) || [];
    return nodeDatas.map(item =>
      (<TreeNode title={item.Name} key={item.key}>
        {this.getTreeNode(dataSource, item.key)}
      </TreeNode>));
  }
  Get = () => {
    const param = {
      PrincipalId: this.state.record.PrincipalId,
      PrincipalType: this.state.record.PrincipalType,
      rootNode: this.state.rootNode,

    };
    post(this.state.getPermissionUrl, param, (res) => {
      if (res.status === 1) {
        this.setState({
          checkedKeys: LodashMap(res.data, 'key'),
        });
      }
    });
  }
  handleSetPermissions = () => {
    // const { record } = this.state;
    const param = {
      PrincipalId: this.state.record.PrincipalId,
      PrincipalType: this.state.record.PrincipalType,
      dimensions: this.state.checkedKeys,
      rootNode: this.state.rootNode,
    };
    post(this.state.setPermissionUrl, param, (res) => {
      if (res.status === 1) {
        this.setState({
          visible: false,
        });
        message.success('保存成功！');
      }
    });
  }
  handleSelectChange = (rootNode) => {
    const item = LodashFind(this.state.treeNodes, { rootNode });
    this.setState({
      dataSource: item.nodes,
      rootNode: item.rootNode,
      rootNodeName: item.rootNodeName,
      selectValue: item.rootNode,
    }, () => {
      this.Get();
    });
  }
  render() {
    const {
            visible,
      onCancel,
      treeNodes,
      dataSource,
      rootNodeName,
      rootNode,
      selectValue,
      expandedKeys,
      checkedKeys,
        } = this.state;
    return (
      <Modal
        className="user-modal"
        visible={visible}
        title={<FormattedMessage id="da_title" />}
        okText={<FormattedMessage id="save" />}
        cancelText={<FormattedMessage id="cancel" />}
        onCancel={onCancel}
        onOk={this.handleSetPermissions}>
        <Select
          size="large"
          className="ctree-nodes-select"
          value={selectValue}
          onChange={this.handleSelectChange}
          style={{ width: 200 }}>
          {
            treeNodes.map(value => (<Option key={value.rootNode}>{value.rootNodeName}</Option>))
          }
        </Select>
        {
          rootNode ?
            <Tree
              defaultExpandAll
              checkable
              defaultExpandedKeys={expandedKeys}
              expandedKeys={expandedKeys}
              checkedKeys={checkedKeys}
              onExpand={this.onExpand}
              onCheck={this.onCheck}>
              {
                rootNode ?
                  <TreeNode title={rootNodeName} key={rootNode}>
                    {this.getTreeNode(dataSource, rootNode)}
                  </TreeNode>
                  :
                  ''
              }
            </Tree>
            :
            ''
        }
      </Modal>
    );
  }
}
DimensionModal.propTypes = {
  model: PropTypes.object,
  visible: PropTypes.bool,
  treeNodes: PropTypes.array,
  record: PropTypes.object,
  onCancel: PropTypes.func,
};
