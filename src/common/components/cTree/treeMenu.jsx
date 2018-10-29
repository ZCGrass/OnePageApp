import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon } from 'antd';
import './style.scss';

export default function TreeMenu(event, treeNode, rightMenu, rightMenuContainer, cbDom, menuClick, messages) {
  // const _this = this;
  const treeMenu = {};
  treeMenu.treeNode = treeNode;
  treeMenu.event = event;
  treeMenu.rightMenuKey = 0;
  treeMenu.popupVisible = false;
  treeMenu.rightMenu = rightMenu;
  treeMenu.rightMenuContainer = rightMenuContainer;
  treeMenu.menuClick = menuClick;
  treeMenu.cbDom = cbDom;
  treeMenu.messages = messages;

  treeMenu.getContainer = () => {
    if (!treeMenu.rightMenuContainer) {
      treeMenu.rightMenuContainer = document.createElement('div');
      document.body.appendChild(treeMenu.rightMenuContainer);
    }
    return treeMenu.rightMenuContainer;
  };
  treeMenu.getRightMenuInfo = () => {
    const { pageX, pageY } = { ...treeMenu.event };
    const menuStyle = {
      // position: 'absolute',
      left: `${pageX}px`,
      top: `${pageY}px`,
      backgroundColor: '#108ee9',
    };
    const menu = (
      <Menu
        className="treeMenu"
        theme="dark"
        onClick={treeMenu.handleMenuClick}
        style={menuStyle}>
        <Menu.Item key="1"><Icon type="plus-circle" />{treeMenu.messages.add}</Menu.Item>
        <Menu.Item key="2"><Icon type="edit" />{treeMenu.messages.modify}</Menu.Item>
        <Menu.Item key="5"><Icon type="usergroup-add" />{treeMenu.messages.authority}</Menu.Item>
        <Menu.Item key="3"><Icon type="delete" />{treeMenu.messages.delete}</Menu.Item>
        <Menu.Item key="4"><Icon type="close-circle" />{treeMenu.messages.cancel}</Menu.Item>
      </Menu>);
    return menu;
  };
  treeMenu.handleMenuClick = (menu) => {
    treeMenu.menuClick(menu);
    if (treeMenu.rightMenuContainer) {
      document.body.removeChild(treeMenu.rightMenuContainer);
      treeMenu.rightMenuContainer = null;
      treeMenu.rightMenu = null;
      treeMenu.cbDom(null, null);
    }
  };
  treeMenu.renderRightMenu = () => {
    if (treeMenu.rightMenuContainer) {
      ReactDOM.unmountComponentAtNode(treeMenu.rightMenuContainer);
      treeMenu.rightMenu = null;
    }
    treeMenu.rightMenu = treeMenu.getRightMenuInfo();
    const container = treeMenu.getContainer();
    treeMenu.cbDom(treeMenu.rightMenu, container);
    Object.assign(treeMenu.rightMenuContainer.style, {
      position: 'absolute',
      left: `${treeMenu.event.pageX}px`,
      top: `${treeMenu.event.pageY + 5}px`,
    });
    ReactDOM.render(treeMenu.rightMenu, container);
  };
  return treeMenu.renderRightMenu();
}

