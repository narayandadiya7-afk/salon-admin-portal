import { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TConfigParam } from '../../../types/config';
import useFetch from '../../../hooks/useFetch';
import { eResultCode } from '../../../utils/enum';
import { notification } from '../../../utils/notification';
import { AddEditConfigParam, GetSpecificConfigParam } from '../../../utils/api.constant';

const groupOptions = [
  { label: 'Group 1', value: 1 },
  { label: 'Group 2', value: 2 },
  { label: 'Group 3', value: 3 },
];

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
};

export default function ConfigParamForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { post } = useFetch();

  useEffect(() => {
    fetchSpecificParam();
  }, []);

  const defaultValues: TConfigParam = {
    id: 0,
    name: '',
    description: '',
    groupName: '',
    groupId: null,
    groupUniqueId: '',
    paramUniqueId: '',
  };

  const onFinish = async (values: TConfigParam) => {
    try {
      const payload = { data: { ...values } };
      setIsLoading(true);

      const response = await post(AddEditConfigParam, payload);
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

  const fetchSpecificParam = async () => {
    if (props.id > 0) {
      try {
        const payload = { data: { id: props.id } };
        setIsLoading(true);
        const response = await post(GetSpecificConfigParam, payload);
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
        name="configParamForm"
        onFinish={onFinish}
        initialValues={defaultValues}
        layout="vertical"
        className="drawer-form"
      >
        <div className="drawer-form-content">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="groupId"
                label="Config Group"
                rules={[{ required: true, message: 'Please select config group' }]}
              >
                <Select
                  placeholder="Select config group"
                  options={groupOptions}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="paramUniqueId"
                label="Param Unique ID"
                rules={[{ required: true, message: 'Please enter param unique ID' }]}
              >
                <Input placeholder="Enter unique ID" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                name="name"
                label="Parameter Name"
                rules={[{ required: true, message: 'Please enter parameter name' }]}
              >
                <Input placeholder="Enter parameter name" />
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                name="description"
                label="Description"
              >
                <Input.TextArea placeholder="Enter description (optional)" />
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
