import { MARKDOC } from '@/common';
import highCssList from '@/common/highCssList.json';
import zh from '@/common/zh-cn.json';
import { getOssConfig } from '@/services/egg-blog/user';
import { ossPut } from '@/utils/oss';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import { Editor } from '@bytemd/react';
import { Form, Input } from 'antd';
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

const WriteDoc: React.FC = () => {
  const [value, setValue] = useState(MARKDOC);

  return (
    <div className={styles.byte}>
      <Form.Item label="标题">
        <Input className={styles.input} />
      </Form.Item>
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
