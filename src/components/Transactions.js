import React, { useEffect, useState } from "react";
import "../App.css";
import { Col, Row, Table, Button } from "antd";
import PurchaseModal from "./PurchaseModal";

const columns = [
  {
    title: "Stock",
    dataIndex: "stock_name",
  },
  {
    title: "Volume",
    dataIndex: "volume",
  },
  {
    title: "Purchase price",
    dataIndex: "stock_purchase_price",
  },
  {
    title: "Current price",
    dataIndex: "stock_current_price",
  },
  {
    title: "Gain/Loss",
    dataIndex: "price_difference",
    render: (text) => {
      let value = Number(text);
      return value.toFixed(2);
    },
  },
  {
    title: "Purchase time",
    dataIndex: "created_at",
  },
];

function Transactions(props) {
  const { userName } = props;
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTransactions = () => {
    fetch(`/transactions/client/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, [userName]);

  return (
    <>
      <Row justify={"space-between"}>
        <Col className="transactions-title">Transactions</Col>
        <Col className="create-new-purchase-btn">
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}>
            Create new purchase
          </Button>
          <PurchaseModal
            show={isModalOpen}
            setShow={() => setIsModalOpen(false)}
            userName={userName}
          />
        </Col>
      </Row>
      <Table
        className="transactions-table-container"
        key={1}
        columns={columns}
        dataSource={transactions}
        pagination={false}
        size="middle"
      />
    </>
  );
}

export default Transactions;
