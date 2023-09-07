import React from "react";
import { Col, Row } from "antd";

function HeaderInfo(props) {
  const { userName } = props;
  return (
    <>
      <Row justify={"space-between"}>
        <Col className="header-title">Logo</Col>
        <Col className="header-title">{userName}</Col>
      </Row>
    </>
  );
}

export default HeaderInfo;
