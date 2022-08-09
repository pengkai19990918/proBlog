import DocList from '@/pages/Home/components/DocList';
import { Col, Row } from 'antd';
import React from 'react';

const Home: React.FC = () => {
  return (
    <Row justify={'center'}>
      <Col span={12}>
        <DocList />
      </Col>
    </Row>
  );
};

export default Home;
