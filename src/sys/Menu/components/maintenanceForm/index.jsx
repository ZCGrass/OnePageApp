import React from 'react';
import { Modal, Form, Input, Checkbox, Select, InputNumber } from 'antd';
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item;
const Option = Select.Option;
export default Form.create()((props) => {
  const {
        visible,
    onCancel,
    onOk,
    form,
    action,
    dataItem,
    } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  let title = '';
  if (action === '1') {
    title = <FormattedMessage id="menu_title_Add" />;
  } else if (action === '2') {
    title = <FormattedMessage id="menu_title_Modify" />;
  } else {
    return (<div />);
  }

  return (
    <Modal
      visible={visible}
      title={title}
      okText={<FormattedMessage id="save" />}
      cancelText={<FormattedMessage id="cancel" />}
      onCancel={onCancel}
      onOk={onOk}>
      <Form>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_ParentNodeName" />}>
          <span>{dataItem.ParentNodeName || ''}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_App_Id" />}>
          {getFieldDecorator('App_Id', {
            initialValue: action === '2' ? dataItem.App_Id : dataItem.appDatas[0].Name || '',
            rules: [{ required: true, message: <FormattedMessage id="menu_App_Id_RM" /> }],
          })(<Select>
            {dataItem.appDatas.map(value => <Option key={value.Name}>{value.Name}</Option>)}
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_PrincipalId" />}>
          <span>{action === '2' ? dataItem.PrincipalId : ''}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_Name" />}>
          {getFieldDecorator('Name', {
            initialValue: action === '2' ? dataItem.Name : '',
            rules: [{ required: true, message: <FormattedMessage id="menu_Name_RM" /> }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_M_Url" />}>
          {getFieldDecorator('M_Url', {
            initialValue: action === '2' ? dataItem.M_Url : '',
            rules: [{ required: true, message: <FormattedMessage id="menu_M_Url_RM" /> }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_M_AppendUrl" />}>
          {getFieldDecorator('M_AppendUrl', {
            initialValue: action === '2' ? dataItem.M_AppendUrl : '',
          })(<Input type="textarea" />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_M_Icon" />}>
          {getFieldDecorator('M_Icon', {
            initialValue: action === '2' ? dataItem.M_Icon : '',
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_Description" />}>
          {getFieldDecorator('Description', {
            initialValue: action === '2' ? dataItem.Description : '',
          })(<Input type="textarea" />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_Order" />}>
          {getFieldDecorator('Order', {
            initialValue: action === '2' ? dataItem.Order : 1000,
            rules: [{ required: true, message: <FormattedMessage id="menu_Order_RM" /> }],
          })(<InputNumber />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_M_IsEnable" />}>
          {getFieldDecorator('M_IsEnable', {
            initialValue: action === '2' ? dataItem.M_IsEnable : true,
            valuePropName: 'checked',
          })(<Checkbox><FormattedMessage id="menu_Enable" /></Checkbox>)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_M_IsVisible" />}>
          {getFieldDecorator('M_IsVisible', {
            initialValue: action === '2' ? dataItem.M_IsVisible : true,
            valuePropName: 'checked',
          })(<Checkbox><FormattedMessage id="menu_Visible" /></Checkbox>)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_ModifyTime" />}>
          <span>{action === '2' ? dataItem.ModifyTime : ''}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="menu_ModifyUser" />}>
          <span>{action === '2' ? dataItem.ModifyUser : ''}</span>
        </FormItem>
      </Form>
    </Modal>
  );
});
// <FormItem {...formItemLayout} label={<FormattedMessage id="IsInherit" />}>
// {getFieldDecorator('IsInherit', {
//   initialValue: action === '2' ? dataItem.IsInherit : true,
//   valuePropName: 'checked',
// })(<Checkbox><FormattedMessage id="Inherit" /></Checkbox>)}
// </FormItem>
