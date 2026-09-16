/**
 * Forgot Password Page - Simple & Clean
 */

import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import AuthLayout from "../../components/auth/AuthLayout";
import { notification } from "../../utils/notification";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      // TODO: Implement actual forgot password API call
      // const response = await forgotPasswordAPI(values.email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmailSent(true);
      notification.success("Password reset link sent to your email!");
    } catch (error) {
      console.error("Forgot password error:", error);
      notification.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthLayout>
        <div className={styles.formWrapper}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.title}>Check Your Email</h2>
          <p className={styles.successText}>
            We've sent a password reset link to{" "}
            <strong>{form.getFieldValue("email")}</strong>
          </p>
          <p className={styles.subtitle}>
            Click the link in the email to reset your password. If you don't see
            it, check your spam folder.
          </p>

          <div className={styles.actions}>
            <Link to='/login'>
              <Button
                type='primary'
                block
                className={styles.submitBtn}
              >
                Back to Sign In
              </Button>
            </Link>
            <Button
              type='link'
              onClick={() => {
                setEmailSent(false);
                form.resetFields();
              }}
              className={styles.linkBtn}
            >
              Try another email
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className={styles.formWrapper}>
        <Link
          to='/login'
          className={styles.backLink}
        >
          <ArrowLeftOutlined /> Back to Sign In
        </Link>

        <h2 className={styles.title}>Forgot Password?</h2>
        <p className={styles.subtitle}>
          No worries! Enter your email and we'll send you a reset link.
        </p>

        <Form
          form={form}
          name='forgotPassword'
          onFinish={onFinish}
          layout='vertical'
          size='large'
        >
          <Form.Item
            name='email'
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder='Enter your email'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              block
              className={styles.submitBtn}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form.Item>

          <div className={styles.footer}>
            Remember your password?{" "}
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

export default ForgotPassword;
