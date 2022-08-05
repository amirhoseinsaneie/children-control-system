import "./App.css";
import MenPanel from "./Containers/MenPanel/MenPanel";
import {
  PlusCircleFilled,
  UpOutlined
} from "@ant-design/icons";
import { Layout, Menu, Result, Button, BackTop } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Routes, Route, Link,useLocation, useNavigate } from "react-router-dom";
import WomenPanel from "./Containers/WomenPanel/WomenPanel";
import NewKid from "./Containers/NewKid/NewKid";
const { Sider, Content } = Layout;
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultSelector = ()=>{
    if (location.pathname === '/WomenPanel') {
      return '3'
    }
    else if (location.pathname === '/NewKid') {
      return '1'
    }
    else {
      return '2'
    }
  }
  return (
    <Layout>
      <Sider
        
        collapsible
        
      >
        <div className="logo">پنل پذیرش</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={defaultSelector()}
          items={[
            {
              key: "1",
              icon: <PlusCircleFilled />
              ,
              label: "کودک جدید",
              onClick : ()=>{navigate('/NewKid')}
            },
            {
              key: "2",
              icon: (
                <Link to="/">MA</Link>
              ),
              label: "پذیرش پدران",
              onClick : ()=>{navigate('/')}

            },
            {
              key: "3",
              icon: (
                <Link to="/WomenPanel">FE</Link>
              ),
              label: "پذیرش مادران",
              onClick : ()=>{navigate('/WomenPanel')}
            },

          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            padding: "1rem",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<MenPanel />} />
            <Route
              path="/WomenPanel"
              element={<WomenPanel />}
              caseSensitive={false}
            />
            <Route path="/NewKid" element={<NewKid />} caseSensitive={false} />
            <Route path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="صفحه پیدا نشد!"
                  extra={<Link to='/'><Button type="primary">بازگشت به صفحه اصلی</Button></Link>}
                />
              }
            />
          </Routes>
          <BackTop className="back-to-top"><UpOutlined /></BackTop>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
