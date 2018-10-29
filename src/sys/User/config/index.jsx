import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  searchPlaceHolder: <FormattedMessage id="user_searchPlaceHolder" />,
  add: '/api/User/Add',
  update: '/api/User/Update',
  delete: '/api/User/Delete',
  search: '/api/User/Get',
  deleteConfirmTitle: <FormattedMessage id="user_deleteConfirmTitle" />,
  addIcon: 'user-add',
  defaultModel: {
    PrincipalId: '',
    Name: '',
    NameEn: '',
    User_Account: '',
    User_Sex: '',
    User_Age: '',
    User_Email: '',
    User_Title: '',
    User_Address: '',
    Description: '',
    ModifyTime: '',
    ModifyUser: '',
  },
  columns: [{
    title: <FormattedMessage id="user_Name" />,
    dataIndex: 'Name',
    key: 'Name',
  }, {
    title: <FormattedMessage id="user_NameEn" />,
    dataIndex: 'NameEn',
    key: 'NameEn',
  }, {
    title: <FormattedMessage id="user_User_Account" />,
    dataIndex: 'User_Account',
    key: 'User_Account',
  }, {
    title: <FormattedMessage id="user_User_Sex" />,
    dataIndex: 'User_Sex',
    key: 'User_Sex',
    width: 50,
  }, {
    title: <FormattedMessage id="user_User_Age" />,
    dataIndex: 'User_Age',
    key: 'User_Age',
    width: 50,
  }, {
    title: <FormattedMessage id="user_User_Email" />,
    dataIndex: 'User_Email',
    key: 'User_Email',
  }, {
    title: <FormattedMessage id="user_User_Title" />,
    dataIndex: 'User_Title',
    key: 'User_Title',
    width: 50,
  }, {
    title: <FormattedMessage id="user_User_Address" />,
    dataIndex: 'User_Address',
    key: 'User_Address',
  }, {
    title: <FormattedMessage id="user_Description" />,
    dataIndex: 'Description',
    key: 'Description',
    // width: 150,
  }, {
    title: <FormattedMessage id="user_ModifyTime" />,
    dataIndex: 'ModifyTime',
    key: 'ModifyTime',
    width: 150,
  }, {
    title: <FormattedMessage id="user_ModifyUser" />,
    dataIndex: 'ModifyUser',
    key: 'ModifyUser',
    width: 100,
  }, {
    title: 'Action',
    key: 'operation',
    width: 100,
    fixed: 'right',
    // render: (text, record) => (
    //   <span>
    //     <Button icon="edit" size="small" onClick={() => this.handleEdit(text, record)} />
    //     <Button icon="delete" size="small" onClick={() => this.handleDelete(text, record)} />
    //   </span>
    // ),
  }],
};
