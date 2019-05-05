import React from 'react';
import { Row, Col, Input } from 'antd';

const Search = Input.Search;

export default class SeachBar extends React.Component{
  render = (props) => (
    <Row style={{padding: '20px'}}>
      <Col sm={{span: 24}} md={{span: 12, offset: 6}}>
        <Search
          placeholder="input search text"
          onSearch={this.props.onSearch}
        />
      </Col>
    </Row>
  );
}
