import React, { useEffect, useState } from "react";
import { Button, Dropdown, Alert, InputNumber, Menu } from "antd";
import { Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";

function PurchaseModal(props) {
  const { show, setShow, userName } = props;
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [insertedVolume, setInsertedVolume] = useState("Volume");

  useEffect(() => {
    fetch(`/transactions/stocks`)
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, []);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const menu = (
    <Menu>
      {stocks.map((stock) => (
        <Menu.Item
          key={stock.id}
          onClick={() => handleStockSelect(stock)}>
          {stock.stock_name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handlePurchase = () => {
    let newTransaction = {
      stock_id: selectedStock.stock_id,
      volume: insertedVolume,
      stock_purchase_price: selectedStock.stock_current_price,
    };
    fetchTransaction(newTransaction);
  };

  const fetchTransaction = (transaction) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    };
    fetch(`/transactions/add_transaction/${userName}`, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        if (!response.ok) {
          setShow(false);
          <Alert
            message="New transaction added!"
            type="success"
          />;
        }
      })
      .catch((error) => {
        <Alert
          message="There was a problem with transaction making!"
          type="error"
        />;
        console.error("There was an error!", error);
      });
  };

  const handlePurchaseModalCancel = () => {
    setSelectedStock(null);
    setInsertedVolume("Volume");
    setShow(false);
  };

  const handleDropdownSelect = (value) => {
    setSelectedStock(value);
  };

  return (
    <Modal
      title="Purchase a stock"
      visible={show}
      onOk={handlePurchase}
      onCancel={handlePurchaseModalCancel}>
      <Dropdown overlay={menu}>
        <Button>
          {selectedStock ? selectedStock.stock_name : "Select Stock"}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
      <InputNumber
        min={0} // Use a number instead of a string
        onChange={(value) => setInsertedVolume(value)}
        placeholder="Volume"
      />
    </Modal>
  );
}

export default PurchaseModal;
