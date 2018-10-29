import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  searchPlaceHolder: <FormattedMessage id="da_searchPlaceHolder" />,
  update: '/api/DataAuthority/Update',
  search: '/api/DataAuthority/Get',
  setPermission: '/api/DataAuthority/SetPermission',
  getPermission: '/api/DataAuthority/GetPermission',
  defaultModel: {
    PrincipalId: '',
    Name: '',
    PrincipalType: '',
    Description: '',
    ModifyTime: '',
    ModifyUser: '',
  },
  columns: [{
    title: <FormattedMessage id="da_Name" />,
    dataIndex: 'Name',
    key: 'Name',
    width: 300,
  }, {
    title: <FormattedMessage id="da_PrincipalType" />,
    dataIndex: 'PrincipalType',
    key: 'PrincipalType',
    render: (text) => {
      let label = '';
      if (text === 'user') {
        label = <FormattedMessage id="da_User" />;
      } else if (text === 'role') {
        label = <FormattedMessage id="da_Role" />;
      }
      return (<span>{label}</span>);
    },
    width: 100,
  }, {
    title: <FormattedMessage id="da_Description" />,
    dataIndex: 'Description',
    key: 'Description',
    // width: 150,
  }, {
    title: <FormattedMessage id="da_ModifyTime" />,
    dataIndex: 'ModifyTime',
    key: 'ModifyTime',
    width: 150,
  }, {
    title: <FormattedMessage id="da_ModifyUser" />,
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
