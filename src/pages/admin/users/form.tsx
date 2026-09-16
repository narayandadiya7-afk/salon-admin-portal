import { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TUser } from '../../../types/config';
import { eResultCode } from '../../../utils/enum';
import useFetch from '../../../hooks/useFetch';
import { notification } from '../../../utils/notification';
import { AddEditUser, GetSpecificUser } from '../../../utils/api.constant';

const roleOptions = [
  { label: 'Admin', value: 1 },
  { label: 'User', value: 2 },
  { label: 'Guest', value: 3 },
];

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
};

export default function UserForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { post } = useFetch();

  useEffect(() => {
    fetchSpecificUser();
  }, []);

  const defaultValues: TUser = {
    id: 0,
    userName: '',
    displayName: '',
    emailId: '',
    mobileNo: '',
    password: '',
    roles: [],
  };

  const onFinish = async (values: TUser) => {
    try {
      const payload = { data: { ...values } };
      setIsLoading(true);

      const response = await post(AddEditUser, payload);
      if (response.dataResponse.returnCode === eResultCode.SUCCESS) {
        notification.success(response.dataResponse.description);
        props.onRefreshList();
        props.onCloseDrawer();
      } else {
        notification.error(response.dataResponse.description);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpecificUser = async () => {
    if (props.id > 0) {
      try {
        const payload = { data: { id: props.id } };
        setIsLoading(true);
        const response = await post(GetSpecificUser, payload);
        if (response.dataResponse.returnCode === eResultCode.SUCCESS) {
          form.setFieldsValue(response.data[0]);
        } else {
          notification.error(response.dataResponse.description);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="drawer-form-container">
      <Form
        form={form}
        name="userForm"
        onFinish={onFinish}
        initialValues={defaultValues}
        layout="vertical"
        className="drawer-form"
      >
        <div className="drawer-form-content">
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="userName"
                label="Username"
                rules={[{ required: true, message: 'Please enter username' }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="displayName"
                label="Display Name"
                rules={[{ required: true, message: 'Please enter display name' }]}
              >
                <Input placeholder="Enter display name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="emailId"
                label="E-mail"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="mobileNo"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="roleId"
                label="Role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select placeholder="Select role" options={roleOptions} />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="drawer-form-footer">
          <Button
            icon={<CloseOutlined />}
            onClick={props.onCloseDrawer}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
