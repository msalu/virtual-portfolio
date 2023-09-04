import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space, InputNumber } from "antd";
import { Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";

function PurchaseModal(props) {
  const { show, setShow, userName } = props;
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState();
  const [insertedVolume, setInsertedVolume] = useState("Volume");

  const fetchStocks = () => {
    fetch(`/stocks`)
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
      });
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const now = new Date();

  const handlePurchase = () => {
    let newTransaction = {
      stock_name: selectedStock.stock_name,
      volume: insertedVolume,
      stock_purchase_price: selectedStock.stock_current_price,
      created_at: now,
    };
    // siia tuleb POST päring ja kaasa annad newTransaction objekti
    setShow(false);
  };

  const handlePurchaseModalCancel = () => {
    setSelectedStock();
    setInsertedVolume("Volume");
    setShow(false);
  };

  return (
    <>
      <Modal
        title="Purchase a stock"
        open={show}
        onOk={handlePurchase}
        onCancel={handlePurchaseModalCancel}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Dropdown menu={stocks}>
            <Button>
              <Space>
                Choose stock
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <InputNumber
            min="0"
            onChange={(value) => setInsertedVolume(value)}
            placeholder="Volume"
          />
        </div>
      </Modal>
    </>
  );
}

export default PurchaseModal;
