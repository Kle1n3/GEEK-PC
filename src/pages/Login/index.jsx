import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch } from 'react-redux'
import { useHistory,useLocation } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../../store/actions";
import styles from  "./index.module.scss";
import logo from "../../assets/logo.png";


const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const onFinish = async(values) => {
    console.log("Success:", values);
    const { mobile, code } = values
    try {
      await dispatch(login(mobile, code))
      history.replace(location?.state.returnUrl||'/home')
    } catch (error) {
      message.error(error.response?.data?.message||'登录失败')
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.login}>
      <div className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form
          name="basic"
          size="large"
          validateTrigger={['onChange','onBlur']}
          initialValues={
            {
              mobile: '13911111111',
              code:'246810',
              isAgree: true
            }
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item            
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号码" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message:'手机格式不正确',
              }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='请输入手机号码' />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              { required: true, message: "请输入验证码" },
              {len:6,message:'验证码6个字符串'}
            ]}
          >
            <Input prefix={<LockOutlined />} placeholder='请输入验证码' />
          </Form.Item>

          <Form.Item
            name="isAgree"
            valuePropName="checked"
            rules={[{
              validator: (_, value) => {
                if (value) return Promise.resolve();
                else return Promise.reject(new Error('请勾选我已阅读并同意'))
              }
            }]}
          >
            <Checkbox>我已阅读并同意[用户协议]和[隐私条款]</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
