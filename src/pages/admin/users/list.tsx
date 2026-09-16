/**
 * User List - Modern Ant Design Version
 * Updated with Ant Design Table and improved UI
 */

import { useEffect, useState } from "react";
import {
  Table,
  Card,
  Input,
  Button,
  Space,
  Typography,
  Tag,
  Tooltip,
  Row,
  Col,
  Avatar,
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import useFetch from "../../../hooks/useFetch";
import CustomDrawer from "../../../components/drawer";
import { notification } from "../../../utils/notification";
import Utils from "../../../utils";
import { TFilterModel } from "../../../types/config";
import DateUtils from "../../../utils/date";
import { eResultCode } from "../../../utils/enum";
import UserForm from "./form";
import { defaultFilterParams } from "../../../utils/constants";
import { GetUsersList } from "../../../utils/api.constant";

const { Title, Text } = Typography;
const { Search } = Input;

type TEditMode = {
  enable: boolean;
  data: TUser | null;
};
interface TUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: "active" | "inactive";
  createdOn: string;
}

export default function UserList() {
  const { post } = useFetch();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<TUser[]>([]);
  const [filterParams, setFilterParams] =
    useState<TFilterModel>(defaultFilterParams);
  const [isEditing, setIsEditing] = useState<TEditMode>({
    enable: false,
    data: null,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const updatedParams = Utils.updateParamsFromUrl(
      window.location.href,
      defaultFilterParams,
    );
    setFilterParams(updatedParams);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [
    filterParams.currentPage,
    filterParams.pageSize,
    filterParams.searchText,
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const requestPayload = {
        data: {
          ...filterParams,
        },
      };

      const response = await post(GetUsersList, requestPayload);
      const { data, dataResponse, filterModel } = response;
      const { returnCode, description } = dataResponse;

      if (returnCode === eResultCode.SUCCESS) {
        setData(data);
        setFilterParams(filterModel as TFilterModel);
        setLoading(false);
      } else {
        notification.error(description);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setFilterParams({
      ...filterParams,
      searchText: value,
      currentPage: 1,
    });
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setFilterParams({
      ...filterParams,
      currentPage: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    });
  };

  const handleReset = () => {
    setSearchText("");
    setFilterParams(defaultFilterParams);
  };

  const columns: ColumnsType<TUser> = [
    {
      title: "Sr. No.",
      key: "index",
      width: 80,
      align: "center",
      render: (_: any, __: TUser, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      width: "25%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string, record: TUser) => (
        <Space>
          <Avatar
            size="small"
            icon={<UserOutlined />}
            style={{ backgroundColor: "var(--theme-primary)" }}
          />
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      width: "25%",
      render: (_: any, record: TUser) => (
        <Space direction="vertical" size={0}>
          <Space size="small">
            <MailOutlined style={{ color: "var(--theme-text-secondary)" }} />
            <Text type="secondary">{record.email}</Text>
          </Space>
          {record.phone && (
            <Space size="small">
              <PhoneOutlined style={{ color: "var(--theme-text-secondary)" }} />
              <Text type="secondary">{record.phone}</Text>
            </Space>
          )}
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      width: "15%",
      sorter: (a, b) =>
        new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime(),
      render: (date: string) => DateUtils.format(date),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_: any, record: TUser) => (
        <Tooltip title="Edit">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="action-btn"
            onClick={() => {
              setIsEditing({ enable: true, data: record });
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="user-list-container">
      <Card className="page-card" bordered={false}>
        {/* Header Section */}
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <UserOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>
                Users Management
              </Title>
            </Space>
          </Col>
          <Col>
            <CustomDrawer
              trigger={
                <Button type="primary" icon={<PlusOutlined />} size="large">
                  Add User
                </Button>
              }
              component={UserForm}
              componentProps={{
                id: 0,
                onRefreshList: () => fetchData(),
              }}
              title="Add New User"
              width={600}
              placement="right"
            />
          </Col>
        </Row>

        {/* Search and Filter Section */}
        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search
              placeholder="Search by name, email, or role..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
              size="large"
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              size="large"
              block
            >
              Reset Filters
            </Button>
          </Col>
        </Row>

        {/* Table Section */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            current: filterParams.currentPage,
            pageSize: filterParams.pageSize,
            total: filterParams.totalRows,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          onChange={handleTableChange}
          className="config-table"
          scroll={{ x: 1100 }}
        />
      </Card>

      <CustomDrawer
        isOpen={isEditing.enable}
        onClose={() => setIsEditing({ enable: false, data: null })}
        component={UserForm}
        componentProps={{
          id: isEditing.data?.id,
          onRefreshList: fetchData,
        }}
        title="Edit User"
        width={600}
        placement="right"
      />
    </div>
  );
}
