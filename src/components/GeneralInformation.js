import React, { useEffect, useState } from "react";
import "../App.css";
import { Col, Row, Card } from "antd";

function GeneralInformation(props) {
  const { userName } = props;
  const [clientBalance, setClientBalance] = useState("0");
  const [totalProfit, setTotalProfit] = useState("0");
  const [totalValue, setTotalValue] = useState("0");

  const fetchBalance = () => {
    fetch(`/statistics/client/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        let value = Number(data);
        setClientBalance(value.toFixed(2));
      });
  };

  const fetchTotalProfit = () => {
    fetch(`/statistics/total-profit/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        let value = Number(data);
        setTotalProfit(value.toFixed(2));
      });
  };

  const fetchTotalValue = () => {
    fetch(`/statistics/total-value/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        let value = Number(data);
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
        <Col>General Information</Col>
      </Row>
      <Row justify={"space-between"}>
        {/*<Col>
          <Statistic
            title="Current Balance"
            value={659}
          />
        </Col>*/}
        <Col>
          <Card
            size="small"
            title="Current Balance"
            //extra={<a href="#">More</a>}
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
            //extra={<a href="#">More</a>}
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
            //extra={<a href="#">More</a>}
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
