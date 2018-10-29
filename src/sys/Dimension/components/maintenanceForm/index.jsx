import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
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
    title = <FormattedMessage id="dim_title_Add" />;
  } else if (action === '2') {
    title = <FormattedMessage id="dim_title_Modify" />;
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
        <FormItem {...formItemLayout} label={<FormattedMessage id="dim_ParentNodeName" />}>
          <span>{dataItem.ParentNodeName || ''}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="dim_PrincipalId" />}>
          <span>{action === '2' ? dataItem.PrincipalId : ''}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="dim_Name" />}>
          {getFieldDecorator('Name', {
            initialValue: action === '2' ? dataItem.Name : '',
            rules: [{ required: true, message: <FormattedMessage id="dim_Name_RM" /> }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="dim_Order" />}>
          {getFieldDecorator('Order', {
            initialValue: action === '2' ? dataItem.Order : 1000,
            rules: [{ required: true, message: <FormattedMessage id="dim_Order_RM" /> }],
          })(<InputNumber />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="dim_Description" />}>
          {getFieldDecorator('Description', {
            initialValue: action === '2' ? dataItem.Description : '',
          })(<Input type="textarea" />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="dim_ModifyTime" />}>
          <span>{action === '2' ? dataItem.ModifyTime : ''}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="dim_ModifyUser" />}>
          <span>{action === '2' ? dataItem.ModifyUser : ''}</span>
        </FormItem>
      </Form>
    </Modal>
  );
});
