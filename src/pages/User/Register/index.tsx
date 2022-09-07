import { register } from '@/services/egg-blog/api';
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

type registerFormProps = {
  visible: boolean;
  onCancel: () => void;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Register: React.FC<registerFormProps> = (props) => {
  const { visible, onCancel } = props;

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    await register(values);
  };

  return (
    <Modal title={'注册'} visible={visible} onCancel={onCancel} footer={false}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        // layout="vertical"
        onFinish={onFinish}
        scrollToFirstError
        // style={{
        //   padding: 20
        // }}
      >
        <Form.Item
          name="nickname"
          label="昵称"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="再次输入密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Register;
