import { MARKDOC } from '@/common';
import { markedParse } from '@/utils';
import { Col, Row, Space, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import styles from './index.less';

type docDetailProps = {};

const DocDetail: React.FC<docDetailProps> = () => {
  const doc = markedParse(MARKDOC);
  const time = moment().format('YYYY-MM-DD hh:mm');
  return (
    <Row className={styles.row} justify={'center'}>
      <Col span={12} className={styles.col}>
        <h1 className={styles.title}>LELE</h1>
        <p className={styles.time}>
          <Space>
            <span>时间：{time}</span>{' '}
            <span>
              标签：<Tag color="green">node</Tag>
            </span>
          </Space>
        </p>
        <div dangerouslySetInnerHTML={{ __html: doc }} />
      </Col>
    </Row>
  );
};

export default DocDetail;
