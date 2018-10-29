import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  add: '/api/Role/Add',
  update: '/api/Role/Update',
  delete: '/api/Role/Delete',
  search: '/api/Role/Get',
  setUser: '/api/Role/SetUser',
  getUser: '/api/Role/GetUsers',
  addIcon: 'user-group-add',
  defaultModel: {
    PrincipalId: '',
    key: '',
    Name: '',
    Description: '',
    ModifyTime: '',
    ModifyUser: '',
  },
  columns: [{
    title: <FormattedMessage id="role_Name" />,
    dataIndex: 'Name',
    key: 'Name',
    width: 300,
  }, {
    title: <FormattedMessage id="role_Description" />,
    dataIndex: 'Description',
    key: 'Description',
    // width: 150,
  }, {
    title: <FormattedMessage id="role_ModifyTime" />,
    dataIndex: 'ModifyTime',
    key: 'ModifyTime',
    width: 150,
  }, {
    title: <FormattedMessage id="role_ModifyUser" />,
    dataIndex: 'ModifyUser',
    key: 'ModifyUser',
    width: 100,
  }, {
    title: 'Action',
    key: 'operation',
    width: 200,
    fixed: 'right',
    // render: (text, record) => (
    //   <span>
    //     <Button icon="edit" size="small" onClick={() => this.handleEdit(text, record)} />
    //     <Button icon="delete" size="small" onClick={() => this.handleDelete(text, record)} />
    //   </span>
    // ),
  }],
};
