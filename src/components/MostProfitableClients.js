import React, { useEffect, useState } from "react";
import "../App.css";
import { Col, Row, Table } from "antd";

function MostProfitableClients(props) {
  const { setUserName } = props;
  const [topClients, setTopClients] = useState([]);

  const fetchTopClient = () => {
    fetch(`/transactions/most_profitable_clients`)
      .then((res) => res.json())
      .then((data) => {
        setTopClients(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchTopClient();
  }, []);

  const columns = [
    {
      title: "User",
      dataIndex: "user_name",
      render: (text) => {
        return <a onClick={() => setUserName(text)}>{text}</a>;
      },
    },
    {
      title: "Balance",
      dataIndex: "portfolio_value",
      render: (text) => {
        let value = Number(text);
        return value.toFixed(2);
      },
    },
  ];

  return (
    <>
      <Row>
        <Col className="most-profitable-clients-title">
          Most Profitable Clients
        </Col>
      </Row>
      <Table
        className="most-profitable-clients-container"
        key={1}
        columns={columns}
        dataSource={topClients}
        pagination={false}
        size="middle"
      />
    </>
  );
}

export default MostProfitableClients;
