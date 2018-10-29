import React from 'react';
import ReactDOM from 'react-dom';
import LodashFilter from 'lodash.filter';
import LodashRemove from 'lodash.remove';
import LodashFind from 'lodash.find';
import LodashUniq from 'lodash.uniq';
import LodashForeach from 'lodash.foreach';
import LodashMap from 'lodash.map';
import LodashSortBy from 'lodash.sortby';
import { Tree, Modal, message, Button, Select } from 'antd';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import post from '../fetch';
import TreeMenu from './treeMenu';
import AuthorityModal from './authority';
import './style.scss';

const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;
class CTree extends React.Component {
  constructor(props) {
    super(props);
    const model = this.props.model;
    const defaultNode = this.props.defaultNode;
    this.state = {
      dataSource: [],
      dataSources: [],
      appDatas: [],
      expandedKeys: [],
      eventKey: '',
      model,
      action: 0,
      popupVisible: false,
      getUrl: `${process.env.ServiceBaseApi}${model.search}`,
      addUrl: `${process.env.ServiceBaseApi}${model.add}`,
      updateUrl: `${process.env.ServiceBaseApi}${model.update}`,
      deleteUrl: `${process.env.ServiceBaseApi}${model.delete}`,
      getCurrentPrincipals: `${process.env.ServiceBaseApi}${model.getCurrentPrincipals}`,
      rootNode: defaultNode,
      rootNodeName: '',
      createTree: false,
      selectVisible: !defaultNode,
      defaultSelectValue: defaultNode,
      defaultNode,
      principals: [],
      currentPrincipals: [],
      authorityModalVisible: false,
    };
  }
  componentDidMount() {
    this.handleGet(this.state.defaultNode);
    const _this = this;
    // 当鼠标点击非菜单区域时，隐藏菜单
    _this.mouseClickListener = addEventListener(document.documentElement, 'click', (e) => {
      if (e.target.className.indexOf('ant-menu-item') < 0 && _this.rightMenuContainer) {
        document.body.removeChild(_this.rightMenuContainer);
        _this.rightMenuContainer = null;
        _this.rightMenu = null;
      }
    });
  }
  // 移除右侧菜单容器
  componentWillUnmount() {
    this.mouseClickListener.remove();
    if (this.rightMenuContainer) {
      ReactDOM.unmountComponentAtNode(this.rightMenuContainer);
      document.body.removeChild(this.rightMenuContainer);
      this.rightMenuContainer = null;
    }
  }
  // 在展开的节点中移除树的子节点
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
  onRightClick = (info) => {
    const _this = this;
    const { intl } = this.props;
    this.setState({ eventKey: info.node.props.eventKey });
    TreeMenu(info.event, info, this.rightMenu, this.rightMenuContainer, (rightMenu, rightMenuContainer) => {
      _this.rightMenuContainer = rightMenuContainer;
      _this.rightMenu = rightMenu;
    }, (menu) => {
      if (menu.key === '5') {
        _this.GetAuthorityPrincipals();
      } else if (menu.key !== '4') {
        if (menu.key === '3') {
          _this.handleDelete();
        }
        _this.setState({ popupVisible: true, action: menu.key });
      }
    }, {
        add: intl.formatMessage({ id: 'add' }),
        modify: intl.formatMessage({ id: 'modify' }),
        delete: intl.formatMessage({ id: 'delete' }),
        authority: intl.formatMessage({ id: 'authority' }),
        cancel: intl.formatMessage({ id: 'Cancel' }),
      });
  }
  // 展示树子节点
  getTreeNode = (dataSource, ParentNode) => {
    const nodeDatas = LodashSortBy(LodashFilter(dataSource, value => (value.ParentNode === ParentNode && value.ParentNode !== value.PrincipalId)), 'Order') || [];
    return nodeDatas.map(item =>
      (<TreeNode title={item.Name} key={item.key}>
        {this.getTreeNode(dataSource, item.key)}
      </TreeNode>));
  }
  getLevel2ExpandedKeys = dataSource => (LodashMap(LodashFilter(dataSource, value => (value.ParentNodeIndex.split('-')).length < 3), 'key'));
  // 获取数据，当value为空时获取所有菜单；
  handleGet = (value) => {
    const _this = this;
    post(this.state.getUrl, value, (res) => {
      if (res.status === 1) {
        const treeNodes = res.data.treeNodes;
        let dataSource = [];
        let dataSources = [];
        let rootNode = '';
        let rootNodeName = '';

        if (treeNodes && treeNodes.length > 0) {
          dataSources = treeNodes;
          dataSource = treeNodes[0].nodes;
          rootNode = treeNodes[0].rootNode;
          rootNodeName = treeNodes[0].rootNodeName;
        }
        _this.setState({
          dataSources,
          dataSource,
          defaultSelectValue: rootNode,
          rootNode,
          rootNodeName,
          appDatas: res.data.appDatas,
          expandedKeys: _this.getLevel2ExpandedKeys(dataSource),
        });
      }
    });
  }
  // 菜单间切换
  handleSelectChange = (rootNode) => {
    const item = LodashFind(this.state.dataSources, { rootNode });
    this.setState({
      dataSource: item.nodes,
      expandedKeys: this.getLevel2ExpandedKeys(item.nodes),
      rootNode: item.rootNode,
      rootNodeName: item.rootNodeName,
      defaultSelectValue: item.rootNode,
    });
  }
  GetAuthorityPrincipals = () => {
    const _this = this;
    const {
      rootNode,
      getCurrentPrincipals,
      eventKey,
    } = this.state;
    const param = {
      rootNode,
      currentNode: eventKey,
    };
    post(getCurrentPrincipals, param, (res) => {
      if (res.status === 1) {
        const {
          currentPrincipals,
          principals,
        } = res.data;
        _this.setState({
          currentPrincipals,
          principals,
          authorityModalVisible: true,
        });
      }
    });
  }
  // 隐藏右侧弹出的菜单
  handleCancel = () => {
    this.setState({
      popupVisible: false,
      authorityModalVisible: false,
    });
  }
  // 新增节点的Form回调
  handleCreate = () => {
    const form = this.form;
    const {
      dataSource,
      expandedKeys,
      eventKey,
      rootNodeName,
      rootNode,
      addUrl,
      createTree,
      defaultSelectValue,
    } = this.state;
    const _this = this;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (!createTree) {
        values.ParentNode = eventKey;
        const item = LodashFind(dataSource, { key: eventKey });
        values.ParentNodeIndex = item.ParentNodeIndex;
      }
      post(addUrl, values, (res) => {
        message.success('add success.');
        form.resetFields();
        const dataSources = res.data.treeNodes;
        let dataSourceTemp = [];
        let rootNodeNameTemp = rootNodeName;
        let rootNodeTemp = rootNode;
        let eventKeyTemp = eventKey;
        let defaultSelectValueTemp = defaultSelectValue;
        if (createTree) {
          const rootItem = LodashFind(dataSources, { rootNodeName: values.Name });
          dataSourceTemp = rootItem.nodes;
          rootNodeNameTemp = rootItem.rootNodeName;
          rootNodeTemp = rootItem.rootNode;
          eventKeyTemp = rootItem.rootNode;
          defaultSelectValueTemp = rootItem.rootNode;
          expandedKeys.push(rootItem.rootNode);
        } else {
          const rootItem = LodashFind(dataSources, { rootNode });
          dataSourceTemp = rootItem.nodes;
          const currentItem = LodashFind(rootItem.nodes, { Name: values.Name, App_Id: values.App_Id, M_Url: values.M_Url });
          expandedKeys.push(currentItem.PrincipalId);
        }
        _this.setState({
          dataSource: dataSourceTemp,
          dataSources,
          rootNodeName: rootNodeNameTemp,
          rootNode: rootNodeTemp,
          eventKey: eventKeyTemp,
          expandedKeys: [...expandedKeys],
          defaultSelectValue: defaultSelectValueTemp,
          popupVisible: false,
          createTree: false,
        });
      });
    });
  }
  // 修改节点的Form回调
  handleModify = () => {
    const form = this.form;
    const {
      dataSource,
      eventKey,
      updateUrl,
      rootNode,
      rootNodeName,
    } = this.state;
    const _this = this;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const item = LodashFind(dataSource, { key: eventKey });
      item.Name = values.Name;
      item.Order = values.Order;
      item.IsInherit = values.IsInherit;
      item.App_Id = values.App_Id;
      item.M_Url = values.M_Url;
      item.M_AppendUrl = values.M_AppendUrl;
      item.M_Icon = values.M_Icon;
      item.M_IsEnable = values.M_IsEnable;
      item.M_IsVisible = values.M_IsVisible;
      item.Description = values.Description;
      post(updateUrl, item, (res) => {
        const dataSources = res.data.treeNodes;
        const dataSourceTemp = LodashFind(dataSources, { rootNode }).nodes;
        message.success('add success.');
        form.resetFields();
        _this.setState({
          dataSource: dataSourceTemp,
          dataSources,
          rootNodeName: rootNode === eventKey ? item.Name : rootNodeName,
          popupVisible: false,
        });
      });
    });
  }
  // 删除节点
  handleDelete = () => {
    const _this = this;
    const {
      rootNode,
      dataSource,
      eventKey,
      deleteUrl,
    } = this.state;
    const item = LodashFind(dataSource, { key: eventKey });
    confirm({
      title: this.props.intl.formatMessage({ id: 'deleteConfirm' }),
      content: item.Name,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        post(deleteUrl, eventKey, (res) => {
          if (res.data) {
            message.success('delete success.');
            const dataSources = res.data.treeNodes;
            if (rootNode === eventKey) {
              if (dataSources && dataSources.length > 0) {
                const dataSourceT = dataSources[0].nodes;
                _this.setState({
                  dataSource: dataSourceT,
                  dataSources,
                  rootNode: dataSources[0].rootNode,
                  rootNodeName: dataSources[0].rootNodeName,
                  defaultSelectValue: dataSources[0].rootNode,
                  popupVisible: false,
                  expandedKeys: _this.getLevel2ExpandedKeys(dataSourceT),
                });
              } else {
                _this.setState({
                  dataSource: [],
                  dataSources: [],
                  rootNode: '',
                  rootNodeName: '',
                  popupVisible: false,
                });
              }
            } else {
              const dataSourceT = LodashFind(dataSources, { rootNode }).nodes;
              _this.setState({
                dataSource: dataSourceT,
                expandedKeys: _this.getLevel2ExpandedKeys(dataSourceT),
                popupVisible: false,
              });
            }
          }
        });
      },
      onCancel() {
      },
    });
  }
  // 创建全新树入口
  handleCreateTree = () => {
    this.setState({
      popupVisible: true,
      action: '1',
      createTree: true,
      eventKey: '',
      // rootNode: '',
      // rootNodeName: '',
    });
  }
  // 映射弹出Form的引用
  saveFormRef = (form) => {
    this.form = form;
  }
  computeCurrentDataItem = () => {
    const {
      dataSource,
      action,
      eventKey,
      appDatas,
      createTree,
    } = this.state;
    const dataItem = LodashFind(dataSource, { key: eventKey }) || {};
    if (createTree) {
      dataItem.appDatas = appDatas;
    } else {
      const parentItem = LodashFind(dataSource, { key: dataItem.ParentNode }) || {};
      const appItem = LodashFind(appDatas, { Name: parentItem.App_Id });
      if (appItem) {
        const appDatasTemp = [];
        appDatasTemp.push(appItem);
        dataItem.appDatas = appDatasTemp;
      }
      if (action === '1') {
        dataItem.ParentNodeName = dataItem.Name;
      } else if (action === '2') {
        dataItem.ParentNodeName = parentItem.Name;
      }
    }
    return dataItem;
  }
  render() {
    const {
      dataSource,
      dataSources,
      popupVisible,
      expandedKeys,
      action,
      eventKey,
      rootNode,
      rootNodeName,
      selectVisible,
      defaultSelectValue,
      authorityModalVisible,
      model,
      principals,
      currentPrincipals,
    } = this.state;
    const dataItem = this.computeCurrentDataItem();
    let onOk = null;
    if (action === '1') {
      onOk = this.handleCreate;
    } else if (action === '2') {
      onOk = this.handleModify;
    }
    return (
      <div className="ctree">
        <div className="tree-condition">
          {
            selectVisible ?
              <div>
                <Select
                  size="large"
                  className="ctree-nodes-select"
                  value={defaultSelectValue}
                  onChange={this.handleSelectChange}
                  style={{ width: 200 }}>
                  {
                    dataSources.map(value => (<Option key={value.rootNode}>{value.rootNodeName}</Option>))
                  }
                </Select>
                <Button size="large" onClick={this.handleCreateTree}><FormattedMessage id="create" /></Button>
              </div>
              :
              ''
          }

        </div>
        <div>
          {
            rootNode ?
              <Tree
                expandedKeys={expandedKeys}
                onExpand={this.onExpand}
                onRightClick={this.onRightClick}>
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
          {
            popupVisible ?
              this.props.renderMaintenanceForm(this.saveFormRef, popupVisible, this.handleCancel, dataItem, onOk, action)
              :
              ''
          }
          <AuthorityModal
            visible={authorityModalVisible}
            model={model}
            principals={principals}
            currentPrincipals={currentPrincipals}
            currentNode={eventKey}
            rootNode={rootNode}
            onCancel={this.handleCancel} />
        </div>
      </div>
    );
  }
}
CTree.propTypes = {
  model: PropTypes.object,
  renderMaintenanceForm: PropTypes.func,
  defaultNode: PropTypes.string,
  intl: PropTypes.object,
};
export default injectIntl(CTree, {
  withRef: true,
});
