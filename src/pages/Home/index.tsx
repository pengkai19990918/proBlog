import DocList from '@/pages/Home/components/DocList';
import NavList from '@/pages/Home/components/NavList';
import TagList from '@/pages/Home/components/TagList';
import { Col, Row } from 'antd';
import React from 'react';
import styles from './index.less';

const Home: React.FC = () => {
  return (
    <Row className={styles.row}>
      <Col span={6} className={styles.leftCol}>
        <TagList />
      </Col>
      <Col span={12} className={styles.col}>
        <DocList />
      </Col>
      <Col span={6} className={styles.leftCol}>
        <NavList />
      </Col>
    </Row>
  );
};

export default Home;
