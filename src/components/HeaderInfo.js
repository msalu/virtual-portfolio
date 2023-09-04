import React from "react";
import { Col, Row } from "antd";

function HeaderInfo(props) {
  const { userName } = props;
  return (
    <>
      <Row justify={"space-between"}>
        <Col>Logo</Col>
        <Col>{userName}</Col>
      </Row>
    </>
  );
}

export default HeaderInfo;
