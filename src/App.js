import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout } from "antd";
import Transactions from "./components/Transactions";
import HeaderInfo from "./components/HeaderInfo";
import GeneralInformation from "./components/GeneralInformation";
import RecentStocks from "./components/RecentStocks";
import MostProfitableClients from "./components/MostProfitableClients";

const { Header, Sider, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 100,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 750,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

function App() {
  const [userName, setUserName] = useState("Mark");

  return (
    <Layout>
      <Header style={headerStyle}>
        <HeaderInfo userName={userName} />
      </Header>
      <Layout hasSider>
        <Content style={contentStyle}>
          <GeneralInformation userName={userName} />
          <Transactions userName={userName} />
        </Content>
        <Sider style={siderStyle}>
          <RecentStocks />
          <MostProfitableClients setUserName={(value) => setUserName(value)} />
        </Sider>
      </Layout>
    </Layout>
  );
}

export default App;
