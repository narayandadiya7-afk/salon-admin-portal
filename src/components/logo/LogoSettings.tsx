/**
 * Logo Settings Component
 * Form to upload and manage application logos
 */

import React, { useState } from "react";
import { Form, Upload, Button, message } from "antd";
import { UploadOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import styles from "./LogoSettings.module.css";

interface LogoSettingsProps {
  onCloseDrawer: () => void;
  onSuccess: () => void;
}

const LogoSettings: React.FC<LogoSettingsProps> = ({
  onCloseDrawer,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [smallLogoFile, setSmallLogoFile] = useState<UploadFile[]>([]);
  const [largeLogoFile, setLargeLogoFile] = useState<UploadFile[]>([]);

  // Get current logos from localStorage
  const currentSmallLogo = localStorage.getItem("app-logo-small");
  const currentLargeLogo = localStorage.getItem("app-logo-large");

  const handleImageUpload = (
    file: File,
    type: "small" | "large"
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onFinish = async () => {
    try {
      setLoading(true);

      // Process small logo
      if (smallLogoFile.length > 0 && smallLogoFile[0].originFileObj) {
        const smallBase64 = await handleImageUpload(
          smallLogoFile[0].originFileObj,
          "small"
        );
        localStorage.setItem("app-logo-small", smallBase64);
      }

      // Process large logo
      if (largeLogoFile.length > 0 && largeLogoFile[0].originFileObj) {
        const largeBase64 = await handleImageUpload(
          largeLogoFile[0].originFileObj,
          "large"
        );
        localStorage.setItem("app-logo-large", largeBase64);
      }

      message.success("Logos updated successfully!");
      onSuccess();
      setTimeout(() => {
        onCloseDrawer();
      }, 500);
    } catch (error) {
      console.error("Error uploading logos:", error);
      message.error("Failed to update logos");
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    return false; // Prevent auto upload
  };

  const handleReset = () => {
    localStorage.removeItem("app-logo-small");
    localStorage.removeItem("app-logo-large");
    setSmallLogoFile([]);
    setLargeLogoFile([]);
    message.success("Logos reset to default!");
    onSuccess();
    setTimeout(() => {
      onCloseDrawer();
    }, 500);
  };

  return (
    <div className='drawer-form-container'>
      <Form
        form={form}
        name='logoSettings'
        onFinish={onFinish}
        layout='vertical'
        className='drawer-form'
      >
        <div className='drawer-form-content'>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Small Logo (Collapsed Sidebar)
            </h3>
            <p className={styles.sectionDesc}>
              Recommended: Square image, 40x40px or larger
            </p>

            {currentSmallLogo && (
              <div className={styles.currentLogo}>
                <img
                  src={currentSmallLogo}
                  alt='Current small logo'
                  className={styles.smallPreview}
                />
                <span className={styles.currentLabel}>Current Logo</span>
              </div>
            )}

            <Form.Item name='smallLogo'>
              <Upload
                listType='picture'
                fileList={smallLogoFile}
                beforeUpload={beforeUpload}
                onChange={({ fileList }) => setSmallLogoFile(fileList)}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Large Logo (Expanded Sidebar)
            </h3>
            <p className={styles.sectionDesc}>
              Recommended: Horizontal layout, text/logo combination
            </p>

            {currentLargeLogo && (
              <div className={styles.currentLogo}>
                <img
                  src={currentLargeLogo}
                  alt='Current large logo'
                  className={styles.largePreview}
                />
                <span className={styles.currentLabel}>Current Logo</span>
              </div>
            )}

            <Form.Item name='largeLogo'>
              <Upload
                listType='picture'
                fileList={largeLogoFile}
                beforeUpload={beforeUpload}
                onChange={({ fileList }) => setLargeLogoFile(fileList)}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>
          </div>

          <div className={styles.resetSection}>
            <Button
              type='link'
              danger
              onClick={handleReset}
            >
              Reset to Default Logos
            </Button>
          </div>
        </div>

        <div className='drawer-form-footer'>
          <Button
            icon={<CloseOutlined />}
            onClick={onCloseDrawer}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            icon={<SaveOutlined />}
            loading={loading}
            disabled={smallLogoFile.length === 0 && largeLogoFile.length === 0}
          >
            {loading ? "Saving..." : "Save Logos"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LogoSettings;
