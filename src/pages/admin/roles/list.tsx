/**
 * Role List - Modern Ant Design Version
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
  Badge,
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  ReloadOutlined,
  SafetyOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import useFetch from "../../../hooks/useFetch";
import CustomDrawer from "../../../components/drawer";
import { notification } from "../../../utils/notification";
import Utils from "../../../utils";
import { TFilterModel } from "../../../types/config";
import DateUtils from "../../../utils/date";
import { eResultCode } from "../../../utils/enum";
import RoleForm from "./form";
import { defaultFilterParams } from "../../../utils/constants";
import { GetRolesList } from "../../../utils/api.constant";

const { Title, Text } = Typography;
const { Search } = Input;

interface TRole {
  id: number;
  name: string;
  description: string;
  userCount?: number;
  createdOn: string;
  isActive: boolean;
}

type TEditMode = {
  enable: boolean;
  data: TRole | null;
};

export default function RoleList() {
  const { post } = useFetch();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<TEditMode>({
    enable: false,
    data: null,
  });
  const [data, setData] = useState<TRole[]>([]);
  const [filterParams, setFilterParams] =
    useState<TFilterModel>(defaultFilterParams);

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

      const response = await post(GetRolesList, requestPayload);
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

  const columns: ColumnsType<TRole> = [
    {
      title: "Sr. No.",
      key: "index",
      width: 80,
      align: "center",
      render: (_: any, __: TRole, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <Space>
          <SafetyOutlined style={{ color: "var(--theme-primary)" }} />
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "35%",
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <Text type="secondary">{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "Users",
      dataIndex: "userCount",
      key: "userCount",
      width: "10%",
      align: "center",
      render: (count: number = 0) => (
        <Badge
          count={count}
          showZero
          style={{ backgroundColor: "var(--theme-primary)" }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: "10%",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "ACTIVE" : "INACTIVE"}
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
      render: (_: any, record: TRole) => (
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
    <div className="role-list-container">
      <Card className="page-card" bordered={false}>
        {/* Header Section */}
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <SafetyOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>
                Roles & Permissions
              </Title>
            </Space>
          </Col>
          <Col>
            <CustomDrawer
              trigger={
                <Button type="primary" icon={<PlusOutlined />} size="large">
                  Add Role
                </Button>
              }
              component={RoleForm}
              componentProps={{
                id: 0,
                onRefreshList: () => fetchData(),
              }}
              title="Add New Role"
              width={600}
              placement="right"
            />
          </Col>
        </Row>

        {/* Search and Filter Section */}
        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search
              placeholder="Search by role name or description..."
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
            showTotal: (total) => `Total ${total} roles`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          onChange={handleTableChange}
          className="config-table"
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* DRAWER FORM TO EDIT THE RECORD */}
      <CustomDrawer
        isOpen={isEditing.enable}
        onClose={() => setIsEditing({ enable: false, data: null })}
        component={RoleForm}
        componentProps={{
          id: isEditing.data?.id,
          onRefreshList: fetchData,
        }}
        title="Edit Group"
        width={520}
        placement="right"
      />
    </div>
  );
}
