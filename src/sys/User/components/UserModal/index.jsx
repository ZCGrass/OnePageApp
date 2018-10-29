import React from 'react';
import { Modal, Form, Input, InputNumber, Radio } from 'antd';
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item;

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
    title = <FormattedMessage id="user_title_Add" />;
  } else if (action === '2') {
    title = <FormattedMessage id="user_title_Modify" />;
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

        <FormItem {...formItemLayout} label={<FormattedMessage id="user_Name" />}>
          {getFieldDecorator('Name', {
            initialValue: action === '2' ? dataItem.Name : '',
            rules: [{ required: true, message: <FormattedMessage id="user_Name_RM" /> }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_NameEn" />}>
          {getFieldDecorator('NameEn', {
            initialValue: action === '2' ? dataItem.NameEn : '',
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_User_Account" />}>
          {getFieldDecorator('User_Account', {
            initialValue: action === '2' ? dataItem.User_Account : '',
            rules: [{ required: true, message: <FormattedMessage id="user_User_Account_RM" /> }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_User_Sex" />}>
          {getFieldDecorator('User_Sex', {
            initialValue: action === '2' ? dataItem.User_Sex : '男',
          })(<Radio.Group>
            <Radio value="男">{<FormattedMessage id="user_male" />}</Radio>
            <Radio value="女">{<FormattedMessage id="user_female" />}</Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_User_Age" />}>
          {getFieldDecorator('User_Age', {
            initialValue: action === '2' ? dataItem.User_Age : 1,
            rules: [{ required: true, message: <FormattedMessage id="user_User_Age_RM" /> }],
          })(<InputNumber />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_User_Email" />}>
          {getFieldDecorator('User_Email', {
            initialValue: action === '2' ? dataItem.User_Email : '',
            rules: [{ required: true, message: <FormattedMessage id="user_User_Email_RM" /> }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_User_Title" />}>
          {getFieldDecorator('User_Title', {
            initialValue: action === '2' ? dataItem.User_Title : '',
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_User_Address" />}>
          {getFieldDecorator('User_Address', {
            initialValue: action === '2' ? dataItem.User_Address : '',
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_Description" />}>
          {getFieldDecorator('Description', {
            initialValue: action === '2' ? dataItem.Description : '',
          })(<Input type="textarea" />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_ModifyTime" />}>
          <span>{action === '2' ? dataItem.ModifyTime : ''}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="user_ModifyUser" />}>
          <span>{action === '2' ? dataItem.ModifyUser : ''}</span>
        </FormItem>
      </Form>
    </Modal>);
});
