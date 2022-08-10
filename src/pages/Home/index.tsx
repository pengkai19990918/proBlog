import DocList from '@/pages/Home/components/DocList';
import { Col, Row } from 'antd';
import React from 'react';
import styles from './index.less';

const Home: React.FC = () => {
  return (
    <Row className={styles.row} justify={'center'}>
      <Col span={12} className={styles.col}>
        <DocList />
      </Col>
    </Row>
  );
};

export default Home;
