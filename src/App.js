import React, { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import Transactions from "./components/Transactions";
import HeaderInfo from "./components/HeaderInfo";
import GeneralInformation from "./components/GeneralInformation";
import RecentStocks from "./components/RecentStocks";
import MostProfitableClients from "./components/MostProfitableClients";

const { Header, Sider, Content } = Layout;

/*const headerStyle = {
  textAlign: "center",
  color: "#3b3b3b",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#ededed",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "80px",
  color: "#fff",
  backgroundColor: "#fafafa",
};
const siderStyle = {
  borderLeft: "1px solid #ededed",
  textAlign: "center",
  lineHeight: "80px",
  color: "#3b3b3b",
  backgroundColor: "#fafafa",
};*/

function App() {
  const [userName, setUserName] = useState("Siim");

  return (
    <Layout>
      <Header className="header-style">
        <HeaderInfo userName={userName} />
      </Header>
      <Layout hasSider>
        <Content className="content-style">
          <GeneralInformation userName={userName} />
          <Transactions userName={userName} />
        </Content>
        <Sider className="sider-style">
          <RecentStocks />
          <MostProfitableClients setUserName={(value) => setUserName(value)} />
        </Sider>
      </Layout>
    </Layout>
  );
}

export default App;
