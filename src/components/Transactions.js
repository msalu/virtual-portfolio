import React, { useEffect, useState } from "react";
import "../App.css";
import { Col, Row, Table, Button, Dropdown, Space } from "antd";
import { Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
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
/*const data = [
  {
    key: "1",
    stock: "Adcash OÜ",
    volume: 10,
    purchase_price: "€ 1.00",
    current_price: "€ 5.00",
    gain_and_loss: "+ € 40.00",
    purchase_time: "15.08.2023 12:45",
  },
  {
    key: "2",
    stock: "Adcash OÜ",
    volume: 70,
    purchase_price: "€ 3.00",
    current_price: "€ 5.00",
    gain_and_loss: "+ € 140.00",
    purchase_time: "12.08.2023 13:21",
  },
  {
    key: "3",
    stock: "Google",
    volume: 100,
    purchase_price: "€ 1.00",
    current_price: "€ 0.20",
    gain_and_loss: "- € 80.00",
    purchase_time: "02.07.2023 17:14",
  },
  {
    key: "4",
    stock: "Tesla Inc",
    volume: 1,
    purchase_price: "€ 21.00",
    current_price: "€ 21.00",
    gain_and_loss: "€ 0.00",
    purchase_time: "27.06.2023 21:02",
  },
];*/

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
        <Col>Transactions</Col>
        <Col>
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
