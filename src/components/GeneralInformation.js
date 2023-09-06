import React, { useEffect, useState } from "react";
import "../App.css";
import { Col, Row, Card } from "antd";

function GeneralInformation(props) {
  const { userName } = props;
  const [clientBalance, setClientBalance] = useState("0");
  const [totalProfit, setTotalProfit] = useState("0");
  const [totalValue, setTotalValue] = useState("0");

  const fetchBalance = () => {
    fetch(`/transactions/client/balance/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let value = Number(data[0].balance);
        setClientBalance(value.toFixed(2));
      });
  };

  const fetchTotalProfit = () => {
    fetch(`/transactions/client/gain_and_loss/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let value = Number(data[0].total_gain_loss);
        setTotalProfit(value.toFixed(2));
      });
  };

  const fetchTotalValue = () => {
    fetch(`/transactions/client/portfolio_value/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        let value = Number(data[0].total_portfolio_value);
        setTotalValue(value.toFixed(2));
      });
  };

  useEffect(() => {
    fetchBalance();
    fetchTotalProfit();
    fetchTotalValue();
  }, [userName]);

  const getPlusOrMinus = () => {
    return totalProfit === 0 ? "" : totalProfit < 0 ? "-" : "+";
  };

  return (
    <>
      <Row>
        <Col className="general-info-title">General Information</Col>
      </Row>
      <Row
        className="general-info-tabs"
        justify={"space-between"}>
        <Col>
          <Card
            size="small"
            title="Current Balance"
            style={{
              width: 300,
            }}>
            <p>{"€ " + clientBalance}</p>
          </Card>
        </Col>
        <Col>
          <Card
            size="small"
            title="Total Profit/Loss"
            style={{
              width: 300,
            }}>
            <p>{getPlusOrMinus() + " € " + totalProfit}</p>
          </Card>
        </Col>
        <Col>
          <Card
            size="small"
            title="Total Portfolio Value"
            style={{
              width: 300,
            }}>
            <p>{"€ " + totalValue}</p>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default GeneralInformation;
