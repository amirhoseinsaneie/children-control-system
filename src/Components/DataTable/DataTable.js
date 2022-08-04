import {
  SearchOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import { Button,  Input, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { Component} from "react";
import Highlighter from "react-highlight-words";
import "./DataTable.css";
const URL = "https://pazel.pythonanywhere.com/api2";
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }
  state = {
    data: null,
    searchText: "",
    searchedColumn: "",
    fetched: false,
    loading: false,

  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    axios
      .get(URL + "/kids")
      .then((res) => {
        if (JSON.stringify(this.state.data) !== JSON.stringify(res.data)) {
          this.setState({ data: res.data, fetched: true });
        }
      })
      .then(() => {
        setTimeout(() => {
          this.fetchData();
        }, 30000);
      })
      .catch(() => {
        setTimeout(() => {
          this.fetchData();
        }, 30000);
      });
  };

  entryHandler = (record, index) => {
    this.setState({ loading: true });
    console.log('from post ' , this.state.data[index].number)
    axios
      .post(URL + this.props.entryURL, { id: record.id, number: this.state.data[index].number })
      .then((res) => {
        const dataArray = this.state.data;
        dataArray[index].status = "IN";
        this.setState({ data: dataArray, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };
  deliverHandler = (record, index) => {
    this.setState({ loading: true });
    axios
      .post(URL + this.props.deliverURL, { id: record.id })
      .then((res) => {
        const dataArray = this.state.data;
        dataArray[index].status = "RE";
        this.setState({ data: dataArray, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
    this.setState({ searchedColumn: dataIndex });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={this.searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined style={{ margin: "0px 5px" }} />}
            size="small"
            style={{
              width: 90,
            }}
          >
            جستوجو
          </Button>
          <Button
            onClick={() => clearFilters && this.handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            ریست
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              this.setState({ searchText: selectedKeys[0] });
              this.setState({ searchedColumn: dataIndex });
            }}
          >
            فیلتر
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  render() {
    const columns = [
      {
        title: "نام",
        dataIndex: "first_name",
        key: "first_name",
        align: "right",
        width : '10%',
        ...this.getColumnSearchProps("first_name"),
      },
      {
        title: "نام خانوادگی",
        dataIndex: "last_name",
        key: "last_name",
        align: "right",
        width : '10%',
        ...this.getColumnSearchProps("last_name"),
      },
      {
        title: "جنسیت",
        dataIndex: "gender",
        key: "gender",
        align: "right",
        width : '10%',
        filters: [
          {
            text: "دختر",
            value: "FE",
          },
          {
            text: "پسر",
            value: "MA",
          },
          {
            text: "نامشخص",
            value: "NO",
          },
        ],
        onFilter: (value, record) => record.gender.indexOf(value) === 0,
        sorter: (a, b) => a.gender.localeCompare(b.gender),

        render: (text, record, index) => {
          if (text === "MA") {
            return <Tag color="geekblue">پسر</Tag>;
          } else if (text === "FE") {
            return <Tag color="magenta">دختر</Tag>;
          } else {
            return <Tag>نامشخص</Tag>;
          }
        },
      },
      {
        title: "شماره",
        dataIndex: "number",
        align: "right",
        ...this.getColumnSearchProps("number"),
        sorter: (a, b) => a.number - b.number,
        render: (text, record, index) => {
          
          if (record.status === "NO") {
            return (
              <Input
                onChange={(event) => {
                  if(this.timeout) clearTimeout(this.timeout);
                  this.timeout = setTimeout(() => {
                    const dataArray = this.state.data;
                    dataArray[index].number = event.target.value ? event.target.value.toString() : '0';
                    this.setState({ data: dataArray});
                    console.log(this.state.data[index].number)
                  }, 300);
                  

                }}
                defaultValue={record.number}
              />
            );
          } else {
            return <span>{text.toPersianDigit()}</span>;
          }
        },
      },
      {
        title: "نسبت تحویل دهنده",
        dataIndex: "caretaker",
        key: "caretaker",
        align: "right",
        ...this.getColumnSearchProps("caretaker"),
      },
      {
        title: "نام تحویل دهنده",
        dataIndex: "caretaker_name",
        key: "caretaker_name",
        align: "right",
        ...this.getColumnSearchProps("caretaker_name"),
      },
      {
        title: "شماره تماس",
        dataIndex: "caretaker_phone_number",
        key: "caretaker_phone_number",
        align: "right",
        width : '10%',
        ...this.getColumnSearchProps("caretaker_phone_number"),
        render: (text, record) =>
          text === "ندارد" ? (
            <span>{text}</span>
          ) : (
            <a href={"tel:" + text}>{text.toPersianDigit()}</a>
          ),
      },
      {
        title: "شماره تماس اضطراری",
        dataIndex: "emergancy_calls",
        key: "emergancy_calls",
        align: "right",
        width : '10%',
        ...this.getColumnSearchProps("emergancy_calls"),
        render: (text, record) =>
          text === "ندارد" ? (
            <span>{text}</span>
          ) : (
            <a href={"tel:" + text}>{text.toPersianDigit()}</a>
          ),
      },
      {
        title: "تلفن منزل",
        dataIndex: "caretaker_home_number",
        key: "caretaker_home_number",
        align: "right",
        ...this.getColumnSearchProps("caretaker_home_number"),
        render: (text, record) =>
          text === "ندارد" ? (
            <span>{text}</span>
          ) : (
            <a href={"tel:" + text}>{text.toPersianDigit()}</a>
          ),
      },
      {
        title: "عملیات",
        dataIndex: "status",
        key: "status",
        align: "right",
        width : '10%',
        filters: [
          {
            text: "ورود",
            value: "NO",
          },
          {
            text: "درخواست تحویل",
            value: "IN",
          },
          {
            text: "درخواست تحویل داده شد",
            value: "RE",
          },
          {
            text: "فرستاده شد",
            value: "SE",
          },
          {
            text: "تحویل داده شد" ,
            value: "DE",
          },
          
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        render: (text, record, index) => {
          switch (text) {
            case "NO":
              return (
                <Button
                  onClick={() => {
                    this.entryHandler(record, index);
                  }}
                  block
                  type="primary"
                >
                  ورود
                </Button>
              );
            case "IN":
              return (
                <Button
                  onClick={() => {
                    this.deliverHandler(record, index);
                  }}
                  block
                  type="primary"
                >
                  درخواست تحویل
                </Button>
              );
            case "DE":
              return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  تحویل داده شد
                </Tag>
              );
            case "RE":
              return (
                <Tag icon={<SyncOutlined spin />} color="processing">
                  درخواست تحویل داده شد
                </Tag>
              );
            case "SE":
              return (
                <Tag icon={<ExclamationCircleOutlined />} color="warning">
                  فرستاده شد
                </Tag>
              );
            default:
              return <Tag style={{ width: "100%" }}>اکشنی وجود ندارد.</Tag>;
          }
        },
      },
    ];

    return (
      <div className="DataTable">
        <Table
          loading={this.state.loading || !this.state.fetched}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowKey = { (record)=>record.id}
        />
        <div onClick={this.fetchData} className="Reload">
        <ReloadOutlined />
        <span>بازیابی اطلاعات</span>
        </div>
      </div>
    );
  }
}

export default React.memo(DataTable);
