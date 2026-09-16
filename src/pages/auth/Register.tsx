/**
 * Register Page - Simple & Clean
 */

import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import AuthLayout from "../../components/auth/AuthLayout";
import { TUser } from "../../types/config";
import EncryptUtils from "../../utils/encrypt";
import useFetch from "../../hooks/useFetch";
import { notification } from "../../utils/notification";
import { eResultCode } from "../../utils/enum";
import { ApiAddOrUpdateUserInformation } from "../../utils/api.constant";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { post } = useFetch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (
    values: TUser & { agreement: boolean; confirmPassword: string }
  ) => {
    setLoading(true);
    try {
      const payload = {
        data: {
          displayname: values.displayName,
          userName: values.emailId,
          emailId: values.emailId,
          password: EncryptUtils.encrypt(values.password as string),
          mobileNo: values.mobileNo,
          id: 0,
          roles: [],
        },
      };

      const response = await post(ApiAddOrUpdateUserInformation, payload);
      const { dataResponse } = response;

      if (dataResponse.returnCode === eResultCode.SUCCESS) {
        notification.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        notification.error(dataResponse.description || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      notification.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Sign up to get started</p>

        <Form
          form={form}
          name='register'
          onFinish={onFinish}
          layout='vertical'
          size='large'
          scrollToFirstError
        >
          <Form.Item
            name='displayName'
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder='Full Name'
            />
          </Form.Item>

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
            name='mobileNo'
            rules={[
              { required: true, message: "Please enter your phone" },
              { pattern: /^[0-9]{10}$/, message: "Enter 10 digit number" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder='Phone Number'
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              { required: true, message: "Please enter password" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Confirm Password'
            />
          </Form.Item>

          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept terms")),
              },
            ]}
          >
            <Checkbox>
              I agree to the <a href='/terms'>Terms</a> and{" "}
              <a href='/privacy'>Privacy Policy</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              block
              className={styles.submitBtn}
            >
              Create Account
            </Button>
          </Form.Item>

          <div className={styles.footer}>
            Already have an account?{" "}
            <Link
              to='/login'
              className={styles.link}
            >
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default Register;
