import { getArticle } from '@/services/egg-blog/articles';
import { markedParse } from '@/utils';
import { useParams } from '@@/exports';
import { useRequest } from '@@/plugin-request';
import { Col, Row, Space, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

type docDetailProps = {};

const DocDetail: React.FC<docDetailProps> = (props) => {
  console.log(props);
  const [article, setArticle] = useState<any>({});

  const params = useParams();

  const { data } = useRequest(async () => {
    return await getArticle(params);
  });

  useEffect(() => {
    if (data) {
      setArticle(data);
    }
  }, [data]);

  const doc = article?.content ? markedParse(article.content) : '';
  const time = moment(article.created_time).format('YYYY-MM-DD hh:mm');

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
        <div dangerouslySetInnerHTML={{ __html: doc }} className={styles.box} />
      </Col>
    </Row>
  );
};

export default DocDetail;
