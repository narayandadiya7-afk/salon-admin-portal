/**
 * Config Group List - Modern Ant Design Version
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
  GroupOutlined,
} from "@ant-design/icons";
import useFetch from "../../../hooks/useFetch";
import CustomDrawer from "../../../components/drawer";
import { notification } from "../../../utils/notification";
import Utils from "../../../utils";
import { TConfigGroup, TFilterModel } from "../../../types/config";
import { eResultCode } from "../../../utils/enum";
import ConfigGroupForm from "./form";
import { defaultFilterParams } from "../../../utils/constants";
import { GetConfigGroupList } from "../../../utils/api.constant";

const { Title, Text } = Typography;
const { Search } = Input;

type TEditMode = {
  enable: boolean;
  data: TConfigGroup | null;
};

export default function ConfigGroupList() {
  const { post } = useFetch();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<TEditMode>({
    enable: false,
    data: null,
  });
  const [data, setData] = useState<TConfigGroup[]>([
    {
      id: 1,
      name: "User Management",
      description:
        "Handles user roles, permissions, and authentication settings",
      groupUniqueId: "CFG-GRP-001",
    },
    {
      id: 2,
      name: "Notification Settings",
      description: "Controls email, SMS, and push notification preferences",
      groupUniqueId: "CFG-GRP-002",
    },
    {
      id: 3,
      name: "Payment Configuration",
      description: "Manages payment gateways, currencies, and billing cycles",
      groupUniqueId: "CFG-GRP-003",
    },
    {
      id: 4,
      name: "Security Policies",
      description: "Defines password rules, 2FA, and access restrictions",
      groupUniqueId: "CFG-GRP-004",
    },
    {
      id: 5,
      name: "UI Preferences",
      description: "Customizes themes, layouts, and display settings",
      groupUniqueId: "CFG-GRP-005",
    },
  ]);
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

      const response = await post(GetConfigGroupList, requestPayload);
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

  const columns: ColumnsType<TConfigGroup> = [
    {
      title: "Sr. No.",
      key: "index",
      width: 80,
      align: "center",
      render: (_: any, __: TConfigGroup, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <Space>
          <GroupOutlined style={{ color: "var(--theme-primary)" }} />
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "50%",
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
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_: any, record: TConfigGroup) => (
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
    <div className="config-group-container">
      <Card className="page-card" bordered={false}>
        {/* Header Section */}
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <GroupOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>
                Config Groups
              </Title>
              <Badge
                count={filterParams.totalRows}
                showZero
                style={{ backgroundColor: "var(--theme-primary)" }}
              />
            </Space>
          </Col>
          <Col>
            <CustomDrawer
              trigger={
                <Button type="primary" icon={<PlusOutlined />} size="large">
                  Add Group
                </Button>
              }
              component={ConfigGroupForm}
              componentProps={{
                id: 0,
                onRefreshList: () => fetchData(),
              }}
              title="Add Config Group"
              width={520}
              placement="right"
            />
          </Col>
        </Row>

        {/* Search and Filter Section */}
        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search
              placeholder="Search by group name or description..."
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
            showTotal: (total) => `Total ${total} groups`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          onChange={handleTableChange}
          className="config-table"
          scroll={{ x: 800 }}
        />
      </Card>

      {/* DRAWER FORM TO EDIT THE RECORD */}
      <CustomDrawer
        isOpen={isEditing.enable}
        onClose={() => setIsEditing({ enable: false, data: null })}
        component={ConfigGroupForm}
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
