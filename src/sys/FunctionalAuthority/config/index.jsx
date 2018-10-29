import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  update: '/api/functionalAuthority/Update',
  search: '/api/functionalAuthority/Get',
  setPermission: '/api/functionalAuthority/SetPermission',
  getPermission: '/api/functionalAuthority/GetPermission',
  defaultModel: {
    PrincipalId: '',
    Name: '',
    PrincipalType: '',
    Description: '',
    ModifyTime: '',
    ModifyUser: '',
  },
  columns: [{
    title: <FormattedMessage id="fa_Name" />,
    dataIndex: 'Name',
    key: 'Name',
    width: 300,
  }, {
    title: <FormattedMessage id="fa_PrincipalType" />,
    dataIndex: 'PrincipalType',
    key: 'PrincipalType',
    render: (text) => {
      let label = '';
      if (text === 'user') {
        label = <FormattedMessage id="fa_User" />;
      } else if (text === 'role') {
        label = <FormattedMessage id="fa_Role" />;
      }
      return (<span>{label}</span>);
    },
    width: 100,
  }, {
    title: <FormattedMessage id="fa_Description" />,
    dataIndex: 'Description',
    key: 'Description',
    // width: 150,
  }, {
    title: <FormattedMessage id="fa_ModifyTime" />,
    dataIndex: 'ModifyTime',
    key: 'ModifyTime',
    width: 150,
  }, {
    title: <FormattedMessage id="fa_ModifyUser" />,
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
