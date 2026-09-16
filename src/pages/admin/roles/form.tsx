import { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TPrivilege, TRole } from '../../../types/config';
import { eResultCode } from '../../../utils/enum';
import useFetch from '../../../hooks/useFetch';
import { notification } from '../../../utils/notification';
import PrivilegeMapper from '../../../components/privilege-mapper/index';
import { AddEditRole, GetSpecificRole } from '../../../utils/api.constant';

const menuHierarchy = [
  {
    id: 1,
    name: 'Dashboard',
    dispName: 'Dashboard',
    parentId: 0,
    parentUniqueId: '0',
    entityUrl: '/admin',
    menuIcon: '',
    isActive: 0,
    enableForOthers: 0,
    iconName: 'home',
    displayOrder: 1,
    privileges: [
      {
        id: 16,
        name: 'View Dashboard',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'VIEWDASHBOARD',
        menuUniqueId: 'DASHBOARD_1',
      },
    ],
    menuUniqueId: 'DASHBOARD_1',
    orgId: 0,
    requestDateTime: '0001-01-01T00:00:00',
    requestSource: 0,
    isDeleted: 0,
  },
  {
    id: 2,
    name: 'Users',
    dispName: 'Users',
    parentId: 0,
    parentUniqueId: '0',
    entityUrl: '/users',
    menuIcon: '',
    isActive: 0,
    enableForOthers: 0,
    iconName: 'users',
    displayOrder: 2,
    privileges: [
      {
        id: 1,
        name: 'Add User',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'ADDUSER',
        menuUniqueId: 'USER_2',
      },
      {
        id: 2,
        name: 'Edit User',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'EDITUSER',
        menuUniqueId: 'USER_2',
      },
      {
        id: 3,
        name: 'Delete User',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'DELETEUSER',
        menuUniqueId: 'USER_2',
      },
      {
        id: 4,
        name: 'View User',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'VIEWUSER',
        menuUniqueId: 'USER_2',
      },
    ],
    menuUniqueId: 'USER_2',
    orgId: 0,
    requestDateTime: '0001-01-01T00:00:00',
    requestSource: 0,
    isDeleted: 0,
  },
  {
    id: 3,
    name: 'Roles',
    dispName: 'Roles',
    parentId: 0,
    parentUniqueId: '0',
    entityUrl: '/roles',
    menuIcon: '',
    isActive: 0,
    enableForOthers: 0,
    iconName: 'shield',
    displayOrder: 3,
    privileges: [
      {
        id: 5,
        name: 'Add Role',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'ADDROLE',
        menuUniqueId: 'ROLE_3',
      },
      {
        id: 6,
        name: 'Edit Role',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'EDITROLE',
        menuUniqueId: 'ROLE_3',
      },
      {
        id: 7,
        name: 'Delete Role',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'DELETEROLE',
        menuUniqueId: 'ROLE_3',
      },
      {
        id: 8,
        name: 'View Role',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'VIEWROLE',
        menuUniqueId: 'ROLE_3',
      },
    ],
    menuUniqueId: 'ROLE_3',
    orgId: 0,
    requestDateTime: '0001-01-01T00:00:00',
    requestSource: 0,
    isDeleted: 0,
  },
  {
    id: 4,
    name: 'Config Group',
    dispName: 'Config Group',
    parentId: 0,
    parentUniqueId: '0',
    entityUrl: '/config-group',
    menuIcon: '',
    isActive: 0,
    enableForOthers: 0,
    iconName: 'cog',
    displayOrder: 4,
    privileges: [
      {
        id: 9,
        name: 'Add Config Group',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'ADDCONFIGGROUP',
        menuUniqueId: 'CONFIG_GROUP_4',
      },
      {
        id: 10,
        name: 'Edit Config Group',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'EDITCONFIGGROUP',
        menuUniqueId: 'CONFIG_GROUP_4',
      },
      {
        id: 11,
        name: 'Delete Config Group',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'DELETECONFIGGROUP',
        menuUniqueId: 'CONFIG_GROUP_4',
      },
      {
        id: 12,
        name: 'View Config Group',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'VIEWCONFIGGROUP',
        menuUniqueId: 'CONFIG_GROUP_4',
      },
    ],
    menuUniqueId: 'CONFIG_GROUP_4',
    orgId: 0,
    requestDateTime: '0001-01-01T00:00:00',
    requestSource: 0,
    isDeleted: 0,
  },
  {
    id: 5,
    name: 'Config Param',
    dispName: 'Config Param',
    parentId: 0,
    parentUniqueId: '0',
    entityUrl: '/config-param',
    menuIcon: '',
    isActive: 0,
    enableForOthers: 0,
    iconName: 'sliders',
    displayOrder: 5,
    privileges: [
      {
        id: 13,
        name: 'Add Config Param',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'ADDCONFIGPARAM',
        menuUniqueId: 'CONFIG_PARAM_5',
      },
      {
        id: 14,
        name: 'Edit Config Param',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'EDITCONFIGPARAM',
        menuUniqueId: 'CONFIG_PARAM_5',
      },
      {
        id: 15,
        name: 'Delete Config Param',
        groupId: 1,
        menuId: 0,
        privilegeUniqueId: 'DELETECONFIGPARAM',
        menuUniqueId: 'CONFIG_PARAM_5',
      },
    ],
    menuUniqueId: 'CONFIG_PARAM_5',
    orgId: 0,
    requestDateTime: '0001-01-01T00:00:00',
    requestSource: 0,
    isDeleted: 0,
  },
];

const privileges = [
  {
    id: 1,
    name: 'Add User',
    groupId: 1,
    menuId: 0,
    privilegeUniqueId: 'ADDUSER',
    menuUniqueId: 'USER_2',
  },
  {
    id: 2,
    name: 'Edit User',
    groupId: 1,
    menuId: 0,
    privilegeUniqueId: 'EDITUSER',
    menuUniqueId: 'USER_2',
  },
];

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
};

export default function RoleForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { post } = useFetch();

  useEffect(() => {
    fetchSpecificRole();
  }, []);

  const defaultValues: TRole = {
    id: 0,
    name: '',
    description: '',
    roleUniqueId: '',
  };

  const handlePrivilegesChange = (checkedPrivileges: TPrivilege[]) => {
    console.log('Checked privileges:', checkedPrivileges);
  };

  const onFinish = async (values: TRole) => {
    try {
      const payload = { data: { ...values } };
      setIsLoading(true);

      const response = await post(AddEditRole, payload);
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

  const fetchSpecificRole = async () => {
    if (props.id > 0) {
      try {
        const payload = { data: { id: props.id } };
        setIsLoading(true);
        const response = await post(GetSpecificRole, payload);
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
        name="roleForm"
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
                label="Role Name"
                rules={[{ required: true, message: 'Please enter role name' }]}
              >
                <Input placeholder="Enter role name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="roleUniqueId"
                label="Role Unique ID"
                rules={[{ required: true, message: 'Please enter role unique ID' }]}
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

          <PrivilegeMapper
            menuHierarchy={menuHierarchy}
            preSelectedPrivileges={privileges}
            onPrivilegesChange={handlePrivilegesChange}
          />
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
