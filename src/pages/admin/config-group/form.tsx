import { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TConfigGroup } from '../../../types/config';
import { eResultCode } from '../../../utils/enum';
import { notification } from '../../../utils/notification';
import { AddEditConfigGroup, GetSpecificConfigGroup } from '../../../utils/api.constant';
import useFetch from '../../../hooks/useFetch';

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
};

export default function ConfigGroupForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { post } = useFetch();

  useEffect(() => {
    fetchSpecificGroup();
  }, []);

  const defaultValues: TConfigGroup = {
    id: 0,
    name: '',
    description: '',
    groupUniqueId: '',
  };

  const onFinish = async (values: TConfigGroup) => {
    try {
      const payload = { data: { ...values } };
      setIsLoading(true);

      const response = await post(AddEditConfigGroup, payload);
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

  const fetchSpecificGroup = async () => {
    if (props.id > 0) {
      try {
        const payload = { data: { id: props.id } };
        setIsLoading(true);
        const response = await post(GetSpecificConfigGroup, payload);
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
        name="configGroupForm"
        onFinish={onFinish}
        initialValues={defaultValues}
        layout="vertical"
        className="drawer-form"
      >
        <div className="drawer-form-content">
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Group Name"
                rules={[{ required: true, message: 'Please enter group name' }]}
              >
                <Input placeholder="Enter group name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="groupUniqueId"
                label="Group Unique ID"
                rules={[{ required: true, message: 'Please enter group unique ID' }]}
              >
                <Input placeholder="Enter unique ID" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea 
                  rows={3} 
                  placeholder="Enter description (optional)" 
                />
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
