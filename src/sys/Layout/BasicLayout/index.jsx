import React from 'react';
import { Icon, Layout, Menu, Dropdown, Spin, Row, Col, Button } from 'antd';
import LodashFind from 'lodash.find';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import post from '../../../common/components/fetch';
// import GlobalFooter from '../GlobalFooter';
import DataAuthority from '../../DataAuthority/DataAuthority';
import Dimension from '../../Dimension/Dimension';
import FunctionalAuthority from '../../FunctionalAuthority/FunctionalAuthority';
import SysMenu from '../../Menu/Menu';
import Role from '../../Role/Role';
import User from '../../User/User';
import CompanyDescription from '../../Index/components/Company';
import LOGO from './assets/images/logo.png';
import styles from './style.scss';

const SubMenu = Menu.SubMenu;
const {
  Header,
  // Footer,
  Sider,
  Content,
} = Layout;
export default class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      app: 'sys',
      getUrl: `${process.env.ServiceBaseApi}/api/Index/GetMenu`,
      dataSource: [],
      currentUser: {
        name: 'zengchong',
      },
      language: this.props.language,
      currentContent: <CompanyDescription />,
      selectedKeys: ['index'],
    };
  }
  componentDidMount() {
    this.getData();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ language: nextProps.language });
  }
  getData = () => {
    post(this.state.getUrl, this.state.app, (res) => {
      if (res.status === 1 && res.data) {
        this.setState({
          dataSource: res.data,
          language: this.props.language,
        });
      }
    });
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleNavigator = (value) => {
    const item = LodashFind(this.state.dataSource, { key: value.key });
    let currentContent = <CompanyDescription />;
    if (item.M_Url) {
      const url = item.M_Url.toLowerCase();
      if (url.indexOf('dataauthority.html') >= 0) {
        currentContent = <DataAuthority />;
      } else if (url.indexOf('dimension.html') >= 0) {
        currentContent = <Dimension />;
      } else if (url.indexOf('functionalauthority.html') >= 0) {
        currentContent = <FunctionalAuthority />;
      } else if (url.indexOf('menu.html') >= 0) {
        currentContent = <SysMenu />;
      } else if (url.indexOf('role.html') >= 0) {
        currentContent = <Role />;
      } else if (url.indexOf('user.html') >= 0) {
        currentContent = <User />;
      }
    }
    this.setState({ currentContent, selectedKeys: [value.key] });
  }
  handleLanguageChange = () => {
    this.props.changeLanguage(this.state.language === 'en' ? 'zh' : 'en');
  }
  render() {
    const {
      currentUser,
      language,
      selectedKeys,
      currentContent,
    } = this.state;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    return (
      <Layout className="sw-layout">
        <Header className="header">
          <Row>
            <Col span={20} className="sw-logo">
              <a href="/sys/index.html">
                <img src={LOGO} alt="logo" />
              </a>
            </Col>
            <Col span={4} className="sw-login">
              <div>
                {currentUser.name ? (
                  <Dropdown overlay={menu}>
                    <span>
                      {currentUser.name}
                    </span>
                  </Dropdown>
                ) : <Spin size="small" style={{ marginLeft: 8 }} />}
              </div>
              <div>
                <Button size="small" onClick={this.handleLanguageChange}>{language.toUpperCase()}</Button>
              </div>
            </Col>
          </Row>
        </Header>
        <Layout className="sw-content">
          <Sider>
            <Menu
              className="sw-menu"
              mode="inline"
              selectedKeys={selectedKeys}
              onClick={this.handleNavigator}>
              <SubMenu title={<span>Power BI</span>}>
                <Menu.Item key="pb-component">
                  可视化组件
              </Menu.Item>
                <Menu.Item key="pb-solution">
                  行业解决方案
              </Menu.Item>
              </SubMenu>
              <SubMenu title={<span>数据集成</span>}>
                <Menu.Item key="di-sap">
                  SAP
              </Menu.Item>
                <Menu.Item key="di-sf">ß
                  salesforce
              </Menu.Item>
                <Menu.Item key="di-ddataentry">
                  数据录入
                </Menu.Item>
                <Menu.Item key="di-etl">
                  ETL
                </Menu.Item>
              </SubMenu>
              <SubMenu title={<span>系统管理</span>}>
                {
                  this.state.dataSource.map((item) => {
                    if (item.M_Url !== '/') {
                      return <Menu.Item key={item.key}>{language === 'en' ? item.NameEn : item.Name}</Menu.Item>;
                    }
                    return '';
                  })
                }
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            {currentContent}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
BasicLayout.propTypes = {
  language: PropTypes.string,
  changeLanguage: PropTypes.func,
};

