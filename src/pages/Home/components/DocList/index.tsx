import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Avatar, List, Space } from 'antd';
import React from 'react';
import styles from './index.less';

type DocListProps = {
  list?: any[];
};

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: '#',
  name: `part ${i}`,
  title: `React part + ${i}`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  description: 'Ant Design, a design language for background applications',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const DocList: React.FC<DocListProps> = (props) => {
  const { list = data } = props;

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 6,
      }}
      className={styles.docList}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          onClick={() => {
            history.push('/detail');
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
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.name}</a>}
          />
          <p>
            <a>
              <span className={styles.title}>{item.title}</span>
            </a>
          </p>
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default DocList;
