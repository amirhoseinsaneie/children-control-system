import {
  SearchOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Input,
  Modal,
  PageHeader,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import React, { Component } from "react";
import Highlighter from "react-highlight-words";
import "./DataTable.css";
const URL = "https://bracketacademy.ir/api/api2";
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
    error: null,
    modal: null,
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    if (this.state.error) {
      const timeout = setTimeout(() => {
        this.setState({ error: null });
        clearTimeout(timeout);
      }, 5000);
    }
  }
  fetchData = () => {
    this.setState({ loading: true });
    axios
      .get(URL + "/kids")
      .then((res) => {
        this.setState({ loading: false });
        if (JSON.stringify(this.state.data) !== JSON.stringify(res.data)) {
          this.setState({ data: res.data, fetched: true });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: {
            message: "خطا در دریافت اطلاعات",
            description:
              "اطلاعات به درستی دریافت نشدند، لطفا دوباره تلاش کنید.",
          },
        });
      });
  };
  updateKidsList = () => {
    this.setState({ loading: true });
    axios
      .get(URL + "/porsline")
      .then(() => {
        this.fetchData();
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: { message: err.message, description: "" },
        });
      });
  };
  entryHandler = (record, index) => {
    const postData = () => {
      axios
        .post(URL + this.props.entryURL, {
          id: record.id,
          number: this.state.data[index].number,
          gender: this.state.data[index].gender,
        })
        .then((res) => {
          const dataArray = this.state.data;
          dataArray[index].status = "IN";
          this.setState({ data: dataArray, loading: false, error: null });
          this.fetchData();
        })
        .catch((err) => {
          this.setState({
            loading: false,
            error: { message: err.message, description: "" },
          });
        });
    };

    if (
      this.state.data[index].number.trim() === "000" ||
      this.state.data[index].gender.trim() === "NO" ||
      this.state.data[index].number.trim() === "" ||
      this.state.data[index].gender.trim() === ""
    ) {
      this.setState({
        error: {
          message: "اطلاعات ناقص است",
          description: "جنسیت یا شماره وارد نشده است.",
        },
      });
    } else {
      let isUnique = true;
      for (let i = 0; i < this.state.data.length; i++) {
        const element = this.state.data[i];
        if (element.number === this.state.data[index].number && i !== index) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        this.setState({ loading: true });
        postData();
      } else {
        this.setState({
          modal: {
            title: "فرد دیگر با همین شماره وجود دارد.",
            onOk: () => {
              postData();
              this.setState({ modal: null, loading: true });
            },
            message: "آیا می‌خواهید این فرد را با شماره تکراری ثبت کنید؟",
          },
        });
      }
      console.log(
        "from post ",
        this.state.data[index].number,
        this.state.data[index].gender
      );
    }
  };
  deliverHandler = (record, index) => {
    this.setState({ loading: true });
    axios
      .post(URL + this.props.deliverURL, { id: record.id })
      .then((res) => {
        const dataArray = this.state.data;
        dataArray[index].status = "RE";
        this.setState({ data: dataArray, loading: false, error: null });
        this.fetchData();
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: {
            message: err.message ? err.message : "خطا",
            description: "",
          },
        });
      });
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({ searchText: selectedKeys[0].toEnglishDigit() });
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
          placeholder={`جستجو ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(
              e.target.value ? [e.target.value.toEnglishDigit()] : []
            )
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
              this.setState({ searchText: selectedKeys[0].toEnglishDigit() });
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
      record[dataIndex]
        .toString()
        .toEnglishDigit()
        .toLowerCase()
        .includes(value.toLowerCase()),
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
        width: "7%",
        ...this.getColumnSearchProps("first_name"),
      },
      {
        title: "نام خانوادگی",
        dataIndex: "last_name",
        key: "last_name",
        align: "right",
        width: "9%",
        ...this.getColumnSearchProps("last_name"),
      },
      {
        title: "جنسیت",
        dataIndex: "gender",
        key: "gender",
        align: "right",
        width: "8%",
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
          if (record.status !== "NO") {
            if (text === "MA") {
              return <Tag color="geekblue">پسر</Tag>;
            } else if (text === "FE") {
              return <Tag color="magenta">دختر</Tag>;
            }
          } else {
            return (
              <Select
                style={{
                  width: "100%",
                }}
                value={
                  this.state.data[index].gender === "NO"
                    ? ""
                    : this.state.data[index].gender
                }
                onChange={(value) => {
                  const dataArray = this.state.data;
                  dataArray[index].gender = value ? value.toString() : "";
                  this.setState({ data: dataArray });
                  console.log(this.state.data[index].gender);
                }}
              >
                <Select.Option value="FE">دختر</Select.Option>
                <Select.Option value="MA">پسر</Select.Option>
              </Select>
            );
          }
        },
      },
      {
        title: "شماره",
        dataIndex: "number",
        align: "right",
        width: "8%",
        ...this.getColumnSearchProps("number"),
        sorter: (a, b) =>
          +a.number.toEnglishDigit() - +b.number.toEnglishDigit(),
        render: (text, record, index) => {
          if (record.status === "NO") {
            return (
              <Input
                onChange={(event) => {
                  const dataArray = this.state.data;
                  dataArray[index].number = event.target.value
                    ? event.target.value.toString().toEnglishDigit()
                    : "0";
                  this.setState({ data: dataArray });
                  console.log(this.state.data[index].number);
                }}
                value={
                  this.state.data[index].number === "000"
                    ? ""
                    : this.state.data[index].number
                }
              />
            );
          } else {
            return <span>{text.toPersianDigit()}</span>;
          }
        },
      },
      {
        title: "WC",
        dataIndex: "wc",
        key: "wc",
        align: "right",
        width: "5%",
        filters: [
          {
            text: "بله",
            value: true,
          },
          {
            text: "خیر",
            value: false,
          },
        ],
        onFilter: (value, record) => record.wc === value,
        render: (text, record, index) => (
          <span>{record.wc === true ? "بله" : "خیر"}</span>
        ),
      },

      {
        title: "نسبت تحویل دهنده",
        dataIndex: "caretaker",
        key: "caretaker",
        align: "right",
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
        width: "6%",

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
        width: "8%",

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

        render: (text, record) =>
          text === "ندارد" ? (
            <span>{text}</span>
          ) : (
            <a href={"tel:" + text}>{text.toPersianDigit()}</a>
          ),
      },
      {
        title: "ورود",
        dataIndex: "gate_in",
        key: "gate_in",
        align: "right",
        width: "6%",
        filters: [
          {
            text: "پدران",
            value: "MA",
          },
          {
            text: "مادران",
            value: "FE",
          },
          {
            text: "نامشخص",
            value: "NO",
          },
        ],
        onFilter: (value, record) => record.gate_in.indexOf(value) === 0,
        render: (text, record, index) => {
          switch (record.gate_in) {
            case "NO":
              return <Tag>نامشخص</Tag>;
            case "FE":
              return <Tag color="pink">مادران</Tag>;
            case "MA":
              return <Tag color="blue">پدران</Tag>;
            default:
              break;
          }
        },
      },
      {
        title: "خروج",
        dataIndex: "gate_out",
        key: "gate_out",
        align: "right",
        width: "6%",
        filters: [
          {
            text: "پدران",
            value: "MA",
          },
          {
            text: "مادران",
            value: "FE",
          },
          {
            text: "نامشخص",
            value: "NO",
          },
        ],
        onFilter: (value, record) => record.gate_out.indexOf(value) === 0,
        render: (text, record, index) => {
          switch (record.gate_out) {
            case "NO":
              return <Tag>نامشخص</Tag>;
            case "FE":
              return <Tag color="pink">مادران</Tag>;
            case "MA":
              return <Tag color="blue">پدران</Tag>;
            default:
              break;
          }
        },
      },
      {
        title: "عملیات",
        dataIndex: "status",
        key: "status",
        align: "right",
        width: "8%",
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
            text: "تحویل داده شد",
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
      {
        title: "بازگشت",
        align: "center",
        render: (text, record, index) => {
          return (
            <Button
              disabled={record.status === "NO"}
              className="edit-button"
              onClick={() => {
                this.setState({ loading: true });
                const dataArray = this.state.data;
                let NewStatus = "";
                let NewGateIN = null;
                let NewGateOut = null;

                switch (record.status) {
                  case "IN":
                    NewStatus = "NO";
                    NewGateIN = "NO";
                    break;
                  case "RE":
                    NewStatus = "IN";
                    NewGateOut = "NO";
                    break;
                  case "SE":
                    NewStatus = "IN";
                    NewGateOut = "NO";

                    break;
                  case "DE":
                    NewStatus = "IN";
                    NewGateOut = "NO";

                    break;
                  default:
                    break;
                }
                dataArray[index].status = NewStatus;
                dataArray[index].gate_in = NewGateIN
                  ? NewGateIN
                  : dataArray[index].gate_in;
                dataArray[index].gate_out = NewGateOut
                  ? NewGateOut
                  : dataArray[index].gate_out;
                axios
                  .post(URL + "/undo", { id: record.id, status: NewStatus })
                  .then(() => {
                    this.setState({ data: dataArray, loading: false });
                    record.status = NewStatus;
                    record.gate_in = NewGateIN ? NewGateIN : record.gate_in;
                    record.gate_out = NewGateOut ? NewGateOut : record.gate_out;
                  })
                  .catch((err) => {
                    this.setState({
                      loading: false,
                      error: { message: err.message, description: "" },
                    });
                  });
              }}
              block
              type="link"
            >
              بازگشت
            </Button>
          );
        },
      },
    ];

    return (
      <div className="DataTable">
        <PageHeader
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  height: "1.25rem",
                  width: "1.25rem",
                  fill: "black",
                  position: "relative",
                  marginLeft: "0.5rem",
                  bottom : '0.25rem'
                }}
              >
                {this.props.icon}
              </div>
              {this.props.title}
            </div>
          }
          extra={
            <>
              <Button onClick={this.fetchData} icon={<ReloadOutlined />}>
                بروزرسانی{" "}
              </Button>
            </>
          }
        />
        <Table
          loading={this.state.loading || !this.state.fetched}
          columns={columns}
          dataSource={this.state.data}
          pagination={{ showTitle: false }}
          rowKey={(record) => record.id}
        />

        <Modal
          visible={this.state.modal ? true : false}
          title={this.state.modal ? this.state.modal.title : ""}
          onOk={this.state.modal ? this.state.modal.onOk : null}
          onCancel={() => {
            this.setState({ modal: null });
          }}
          cancelText="خیر"
          okText="بله"
        >
          <p>{this.state.modal ? this.state.modal.message : ""}</p>
        </Modal>
        {this.state.error ? (
          <div className="error-container">
            <Alert
              message={this.state.error.message}
              description={this.state.error.description}
              type="error"
              showIcon
              closable
              onClose={() => {
                this.setState({ error: null });
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default React.memo(DataTable);
