import "./App.css";
import MenPanel from "./Containers/MenPanel/MenPanel";
import {
  PlusCircleFilled,
  UpOutlined,
  HomeFilled,
  UserOutlined
} from "@ant-design/icons";

import { Layout, Menu, Result, Button, BackTop } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import WomenPanel from "./Containers/WomenPanel/WomenPanel";
import NewKid from "./Containers/NewKid/NewKid";



const { Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const defaultSelector = () => {
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
    <Routes>
      <Route path="/signUp" element={
        <div style={{ padding: '1rem', backgroundColor: 'whitesmoke' }}><NewKid /></div>
      } caseSensitive={false} />
      <Route caseSensitive={false} path="*" element={
        <Layout>
          <Sider

            collapsible
            collapsed={collapsed}
            onCollapse={() => { setCollapsed(!collapsed) }}
          >
            <div className="logo">پنل پذیرش</div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={defaultSelector()}
              items={[
                {
                  key: "0",
                  icon: <a href="https://bracketacademy.ir/api/api"><HomeFilled /></a>
                  ,
                  label: "خانه",

                },
                {
                  key: "1",
                  icon: <PlusCircleFilled />
                  ,
                  label: "کودک جدید",
                  onClick: () => { navigate('/NewKid') }
                },
                {
                  key: "2",
                  icon: (
                    <Link className="man-icon" to="/"><svg id="Layer_1" fill="white" dataName="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320.77 412.19"><path d="M156.7,200.87c5.91,9.34,11.12,19,17.77,27.54a59.83,59.83,0,0,0,16.91,14.79c11.78,6.76,23,3.4,33.18-4.73,11.34-9.06,18.87-21,25.81-33.44.86-1.55,1.83-3,3.95-6.55,1.75,2.7,2.67,4.88,4.24,6.4,8.07,7.83,18.57,11,28.79,14.75,16.81,6.13,33.55,12.57,47.55,24.08A33.64,33.64,0,0,1,344.36,256c8.69,20.53,14.51,41.91,18.59,63.87,3.15,17,3.6,33.95,3.58,51.09,0,9.77-5.12,15.57-13.2,18.28-16,5.38-32.2,10.26-48.58,14.27-13.81,3.37-28,5.24-42,7.71a38.83,38.83,0,0,1-6.47.48c-29,0-58.06,1.28-86.95-.36-20.59-1.17-41.15-5.3-61.34-9.84-17.52-3.95-34.47-10.39-51.71-15.62-7.34-2.23-10.65-8.1-10.52-14.63.32-15.24,1.44-30.5,3.09-45.65,1.2-11,3.5-22,5.78-32.9,3.08-14.78,7.8-29.05,15.29-42.24,5.78-10.18,15.34-15.87,25.85-19.75,16.56-6.11,33.58-11.11,48.69-20.57C148.88,207.37,152.82,203.84,156.7,200.87Z" transform="translate(-45.76 0.01)" /><path d="M191.8,9.79c3.44-2.38,6.7-5.09,10.37-7,2.75-1.46,6-2,9.11-2.75.46-.11,1.56,1.1,1.84,1.88,3.43,9.83,10.87,15,20.41,17.85,18.18,5.43,34,14.26,41.75,32.65,6.2,14.66,5.16,29.95,1.62,45.15-.53,2.26-1.31,4.47-1.69,6.75a3.85,3.85,0,0,0,.7,3c3.37,3.21,3.21,7,2.43,11.1-1.46,7.6-2.29,15.11-7.13,22-3,4.3-2.72,10.82-4.73,16-8.26,21.37-20.66,39.57-41.69,50.27-18.55,9.45-35.77,6-52.2-9.61-15.6-14.84-25.53-32.75-29.3-54a6.37,6.37,0,0,0-1-2.72c-5.8-7.31-6.5-16.16-7.42-24.88-.31-2.87-.36-5.9,3.07-7.76,1.07-.58,1.65-3.1,1.52-4.65-.53-6.29-1.29-12.56-2.19-18.81-4.33-29.89,8.7-51.17,33-66.91,5-3.22,9.81-6.64,14.87-9.69.85-.51,2.87,0,3.79.77,1.43,1.14,2.38,2.88,3.53,4.37C192.24,11.78,192,10.79,191.8,9.79Z" transform="translate(-45.76 0.01)" /></svg></Link>
                  ),
                  label: "پذیرش پدران",
                  onClick: () => { navigate('/') }

                },
                {
                  key: "3",
                  icon: (
                    <Link className="woman-icon" to="/WomenPanel" ><svg id="Layer_1" fill="white" dataName="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 658.21 611.39"><path d="M66.08,478.34c13.1-7.71,26.63-14.59,39-23.15,30.81-21.36,48.77-51.05,53.28-88.31,1.23-10.2.17-20.7,0-31.06-.7-36.09-1.95-72.18-2.07-108.27-.12-32.61,2.32-65.08,9.88-97,6.14-25.88,15.72-50.23,32.19-71.45C218,33.74,244.15,18,274.67,9.05A205.86,205.86,0,0,1,327.58.34c16-.39,31.8,2.57,47.36,6.34,22.89,5.56,44.11,14.75,62.65,29.56,22.38,17.87,37.09,41.07,46.82,67.7,9.58,26.21,13.91,53.48,16.1,81.16,3.46,43.76,1.5,87.52.14,131.28q-.58,18.84-.84,37.68c-.44,30.39,10.06,56.82,29.65,79.7,15.95,18.61,36.32,31.18,58.39,41.24l5.78,2.62c-7.42,5.79-14.35,11.35-21.44,16.69-37.4,28.14-77.83,50.52-122.73,64.38a366,366,0,0,1-116.9,16c-18.88-.41-37.83-.58-56.6-2.38-46.31-4.44-89.82-18.52-130.87-40.32-27.78-14.75-53.45-32.64-77.76-52.53C66.68,478.93,66.08,478.34,66.08,478.34ZM194.32,208.82c2.53,18.84,4.56,37.76,7.69,56.49,5.31,31.75,14.11,62.53,28.52,91.48,11.31,22.73,25.49,43.32,46.08,58.75,19.82,14.85,41.84,21.78,66.67,16.91,20.48-4,37.13-15,51.51-29.62,21.55-21.94,35.32-48.57,45.65-77.14,14.26-39.43,20.57-80.41,23.43-122,.18-2.61-.74-3.72-3-4.55-16.78-6.23-33.3-13.3-50.35-18.64-39.28-12.29-79.44-16.09-120.34-10-30.73,4.58-59.93,14.16-88.25,26.7C194.48,200.46,194.48,200.45,194.32,208.82Zm.69-14.21c43.13-19.78,87.09-32.73,134.2-32.52s91,13.31,134.31,32.54C399.3,109.08,258.35,109.75,195,194.61Z" transform="translate(0 -0.31)" /><path d="M658.21,611.69H.28c0-2.39,0-4.66,0-6.93-.1-16.46-.41-32.93-.22-49.39.14-12.48,1.52-24.85,6.29-36.57C13.4,501.46,27,491.2,43.76,484.42c4.4-1.78,9.19-4.79,13.39-4.23s7.76,4.81,11.4,7.72c36.13,28.88,75.05,53,118.51,69.32,44.72,16.84,91,24,138.73,23.4,20.74-.25,41.44-.35,62.08-2.9A366.35,366.35,0,0,0,513.48,538.4c30.08-15.68,57.78-34.92,83.8-56.6a6.29,6.29,0,0,1,6.84-1.27c13.82,4.51,26.87,10.33,37.07,21.14,11.43,12.09,15.86,27.13,16.52,43.14.77,19,.38,38,.5,57.05C658.22,605,658.21,608.16,658.21,611.69Z" transform="translate(0 -0.31)" /></svg></Link>
                  ),
                  label: "پذیرش مادران",
                  onClick: () => { navigate('/WomenPanel') }
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
      } />
    </Routes>


  );
}

export default App;
