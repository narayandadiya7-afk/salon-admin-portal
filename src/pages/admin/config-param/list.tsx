/**
 * Config Param List - Modern Ant Design Version
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
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  ReloadOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import useFetch from "../../../hooks/useFetch";
import CustomDrawer from "../../../components/drawer";

import { TConfigParam, TFilterModel } from "../../../types/config";
import DateUtils from "../../../utils/date";
import ConfigParamForm from "./form";
import notification from "../../../utils/notification";

const { Title } = Typography;
const { Search } = Input;

// Sample data
const paramList: TConfigParam[] = [
  {
    id: 221,
    name: "μS",
    description: "μS",
    groupId: 0,
    groupName: "UOM",
    groupUniqueId: "UOMTYPES",
    createdOn: "2024-07-02T14:48:09.51485",
    organizationId: 0,
    paramUniqueId: "US",
  },
  {
    id: 218,
    name: "minutes",
    description: "minutes",
    groupId: 0,
    groupName: "UOM",
    groupUniqueId: "UOMTYPES",
    createdOn: "2024-07-02T14:04:32.743637",
    organizationId: 0,
    paramUniqueId: "MINUTES",
  },
  {
    id: 215,
    name: "mm",
    description: "mm",
    groupId: 0,
    groupName: "UOM",
    groupUniqueId: "UOMTYPES",
    createdOn: "2024-07-02T14:04:08.635108",
    organizationId: 0,
    paramUniqueId: "MM",
  },
  {
    id: 212,
    name: "∘",
    description: "∘",
    groupId: 0,
    groupName: "UOM",
    groupUniqueId: "UOMTYPES",
    createdOn: "2024-07-02T14:03:45.131908",
    organizationId: 0,
    paramUniqueId: "DEGREE",
  },
  {
    id: 127,
    name: "CPO",
    description: "CPO",
    groupId: 0,
    groupName: "ActionOwner",
    groupUniqueId: "ACTIONOWNER",
    createdOn: "2024-06-21T16:57:13.861776",
    organizationId: 0,
    paramUniqueId: "CPO",
  },
];

const defaultFilterParams: TFilterModel = {
  pageSize: 10,
  currentPage: 1,
  filterRowsCount: 0,
  totalRows: 0,
  searchText: "",
  orderType: "",
  orderBy: "",
  fromDate: null,
  toDate: null,
};

type TEditMode = {
  enable: boolean;
  data: TConfigParam | null;
};

export default function ConfigParamList() {
  const { post: _post } = useFetch();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<TConfigParam[]>(paramList);
  const [filterParams, setFilterParams] =
    useState<TFilterModel>(defaultFilterParams);
  const [searchText, setSearchText] = useState("");

  const [isEditing, setIsEditing] = useState<TEditMode>({
    enable: false,
    data: null,
  });

  useEffect(() => {
    fetchData();
  }, [filterParams.currentPage, filterParams.pageSize]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // API call would go here
      // Simulating API call
      setTimeout(() => {
        setData(paramList);
        // notification.success("Data fetched successfully");
        setFilterParams({
          ...filterParams,
          filterRowsCount: paramList.length,
          totalRows: paramList.length,
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    // Implement search logic
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
    fetchData();
  };

  const columns: ColumnsType<TConfigParam> = [
    {
      title: "Sr. No.",
      key: "index",
      width: 80,
      align: "center",
      render: (_: any, __: TConfigParam, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <Typography.Text strong>{text}</Typography.Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "25%",
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      width: "20%",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      width: "20%",
      sorter: (a, b) => {
        const dateA = a.createdOn ? new Date(a.createdOn).getTime() : 0;
        const dateB = b.createdOn ? new Date(b.createdOn).getTime() : 0;
        return dateA - dateB;
      },
      render: (date: string | Date | undefined) =>
        date ? DateUtils.format(date) : "-",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_: any, record: TConfigParam) => (
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
    <div className="config-param-container">
      <Card className="page-card" bordered={false}>
        {/* Header Section */}
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <UnorderedListOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>
                Config Parameters
              </Title>
            </Space>
          </Col>
          <Col>
            <CustomDrawer
              trigger={
                <Button type="primary" icon={<PlusOutlined />} size="large">
                  Add New
                </Button>
              }
              component={ConfigParamForm}
              componentProps={{
                id: 0,
                onRefreshList: () => fetchData(),
              }}
              title="Add Config Parameter"
              width={520}
              placement="right"
            />
          </Col>
        </Row>

        {/* Search and Filter Section */}
        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search
              placeholder="Search by name, description, or group..."
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
            showTotal: (total) => `Total ${total} items`,
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
        component={ConfigParamForm}
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
