import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space, InputNumber, Menu } from "antd";
import { Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";

function PurchaseModal(props) {
  const { show, setShow, userName } = props;
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState();
  const [insertedVolume, setInsertedVolume] = useState("Volume");
  const dropDownItems = [];

  const menu = (
    <Menu>
      {dropDownItems.map((item) => (
        <Menu.Item
          key={item.key}
          onClick={() => setSelectedStock(item)}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const fetchStocks = () => {
    fetch(`/transactions/stocks`)
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
        data.map((item, index) =>
          dropDownItems.push({ label: item, key: index })
        );
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
    setShow(false);
  };

  const handlePurchaseModalCancel = () => {
    setSelectedStock();
    setInsertedVolume("Volume");
    setShow(false);
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
    {
      label: "4rd menu item",
      key: "4",
    },
  ];
  const menuProps = {
    items,
    onClick: handlePurchase,
  };

  return (
    <>
      <Modal
        title="Purchase a stock"
        open={show}
        onOk={handlePurchase}
        onCancel={handlePurchaseModalCancel}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {selectedStock ? selectedStock.label : "Choose stock"}
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
