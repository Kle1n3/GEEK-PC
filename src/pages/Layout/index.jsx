import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Menu, Popconfirm, Button } from "antd";
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import Dashboard from "../Dashboard";
import Article from "../Article";
import Publish from "../Publish";
import NotFound from "../NotFound";
import {useHistory,useLocation, Redirect, Link, Switch, Route } from "react-router-dom";

import { getUserInfo,logout } from "../../store/actions/user";
import { clearToken } from "../../utils";

const { Header, Sider, Content } = Layout;

const GeekLayout = () => {
  const location = useLocation();
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  let defaultKey = location.pathname;
  if (defaultKey.startsWith("/home/dashboard")) {
    defaultKey = "/home/dashboard";
  }
  const items = [
    {
      label: <Link to="/home/dashboard">数据面板</Link>,
      key: "/home/dashboard",
    },
    { label: <Link to="/home/article">内容管理</Link>, key: "/home/article" },
    { label: <Link to="/home/publish">发布文章</Link>, key: "/home/publish" },
  ];
  useEffect(() => {
    try {
      dispatch(getUserInfo())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])
  const Logout = () => {
    clearToken()
    dispatch(logout())
    history.push('/login')
  }
  return (
    <Layout className={styles.geekLayout}>
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu theme="dark" selectedKeys={[defaultKey]} items={items} />
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
          }}
        >
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{user.name}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认？"
              cancenlText="取消"
              onConfirm={Logout}
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content className="">
          <Switch>
            <Route
              path="/home"
              exact
              render={() => <Redirect to="/home/dashboard" />}
            />
            <Route path="/home/dashboard" component={Dashboard} />
            <Route path="/home/article" component={Article} />
            <Route path="/home/publish/:id?" component={Publish} />
            <Route>
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
