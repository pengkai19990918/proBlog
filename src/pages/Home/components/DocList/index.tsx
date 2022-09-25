import { getArticlesAll } from '@/services/egg-blog/articles';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-list';
import { history } from '@umijs/max';
import { Avatar, List, Space } from 'antd';
import React from 'react';
import styles from './index.less';

type DocListProps = {
  list?: any[];
};

const IconText = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const DocList: React.FC<DocListProps> = () => {
  return (
    <ProList<any>
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 6,
      }}
      className={styles.docList}
      request={async (params = {}) => {
        return (await getArticlesAll(params)) || [];
      }}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          onClick={() => {
            history.push(`/detail/${item.id}`);
          }}
          actions={[
            <IconText
              icon={<StarOutlined className={styles.icon} />}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={<LikeOutlined className={styles.icon} />}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={<MessageOutlined className={styles.icon} />}
              text="2"
              key="list-vertical-message"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<a href={item.href}>{item.name}</a>}
          />
          <p>
            <a>
              <span className={styles.title}>{item.title}</span>
            </a>
          </p>
          {item.description}
        </List.Item>
      )}
    />
  );
};

export default DocList;
