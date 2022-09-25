import { MARKDOC } from '@/common';
import highCssList from '@/common/highCssList.json';
import zh from '@/common/zh-cn.json';
import { addArticle } from '@/services/egg-blog/articles';
import { getOssConfig } from '@/services/egg-blog/user';
import { ossPut } from '@/utils/oss';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import { Editor } from '@bytemd/react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import 'bytemd/dist/index.css';
import React, { useState } from 'react';
import styles from './index.less';
import changeCodeStylePlugin from './mdplugin/changeCodeStyle';

const plugins = [gfm(), highlight(), math(), frontmatter(), changeCodeStylePlugin(highCssList)];

const handleGetOssConfig = async () => {
  try {
    return await getOssConfig();
  } catch (e) {
    return null;
  }
};

/*
 * @params field
 * */
const handleAddArticle = async (field: any) => {
  const hide = message.loading('发布中');
  try {
    await addArticle(field);
    hide();
    message.success('发布成功！');
    return true;
  } catch (e) {
    hide();
    message.error('发布失败！');
    return false;
  }
};

const WriteDoc: React.FC = () => {
  const [value, setValue] = useState(MARKDOC);

  const onFinish = (values: any) => {
    const params = {
      ...values,
      user_id: 1,
      content: value,
      description: '123123123',
    };
    handleAddArticle(params).then();

    console.log(params);
  };

  return (
    <div className={styles.byte}>
      <Form name="article" onFinish={onFinish}>
        <Row>
          <Col span={20}>
            <Form.Item label="标题" name="title">
              <Input className={styles.input} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item className={styles.submit}>
              <Button type="primary" htmlType="submit">
                发布文章
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Editor
        value={value}
        plugins={plugins}
        locale={zh}
        onChange={(v) => {
          setValue(v);
        }}
        uploadImages={([file]) => {
          return new Promise(async () => {
            const ossConfig = await handleGetOssConfig();
            if (ossConfig) {
              const url = await ossPut(file, ossConfig);
              const doc = value + '\n\n' + `![${file.name}](${url})`;
              setValue(doc);
            }
          });
        }}
      />
    </div>
  );
};

export default WriteDoc;
