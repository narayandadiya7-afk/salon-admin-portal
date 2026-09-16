/**
 * Login Page - Simple & Clean
 */

import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import AuthLayout from "../../components/auth/AuthLayout";
import { TResponseModel, TUser } from "../../types/config";
import EncryptUtils from "../../utils/encrypt";
import useFetch from "../../hooks/useFetch";
import { ApiSignin } from "../../utils/api.constant";
import { eResultCode } from "../../utils/enum";
import { notification } from "../../utils/notification";
import AuthUtil from "../../utils/auth";
import Utils from "../../utils";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { post } = useFetch();
  const [form] = Form.useForm();

  const onFinish = async (values: TUser & { remember?: boolean }) => {
    try {
      setLoading(true);
      const response: TResponseModel = await post(ApiSignin, {
        data: {
          emailId: values.emailId,
          password: EncryptUtils.encrypt(values.password as string),
        },
      });
      const { dataResponse, data } = response;
      const { returnCode, description } = dataResponse;

      if (returnCode === eResultCode.SUCCESS) {
        AuthUtil.setToken(data as string);
        notification.success(description || "Login successful!");
        setTimeout(() => {
          Utils.redirectUrl("/admin/dashboard");
        }, 500);
      } else {
        notification.error(description || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      notification.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Sign In</h2>
        <p className={styles.subtitle}>
          Welcome back! Please enter your details.
        </p>

        <Form
          form={form}
          name='login'
          onFinish={onFinish}
          layout='vertical'
          size='large'
        >
          <Form.Item
            name='emailId'
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Password'
            />
          </Form.Item>

          <div className={styles.extras}>
            <Form.Item
              name='remember'
              valuePropName='checked'
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link
              to='/forgot-password'
              className={styles.link}
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              block
              className={styles.submitBtn}
            >
              Sign In
            </Button>
          </Form.Item>

          <div className={styles.footer}>
            Don't have an account?{" "}
            <Link
              to='/register'
              className={styles.link}
            >
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default Login;
