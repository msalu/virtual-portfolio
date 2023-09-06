import React, { useEffect, useState } from "react";
import "../App.css";
import { Col, Row, Table } from "antd";

const columns = [
  {
    title: "Stock",
    dataIndex: "stock_name",
  },
  {
    title: "Price",
    dataIndex: "stock_current_price",
  },
];

function RecentStocks(props) {
  const [stocks, setStocks] = useState([]);

  const fetchRecentStocks = () => {
    fetch(`/transactions/recent_stocks`)
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchRecentStocks();
  }, []);
  return (
    <>
      <Row>
        <Col className="recent-stocks-title">Recent Stocks</Col>
      </Row>
      <Table
        className="recent-stocks-container"
        key={1}
        columns={columns}
        dataSource={stocks}
        pagination={false}
        size="middle"
      />
    </>
  );
}

export default RecentStocks;
