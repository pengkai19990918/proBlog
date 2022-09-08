import highCssList from '@/common/highCssList.json';
import zh from '@/common/zh-cn.json';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import { Editor } from '@bytemd/react';
import { Select } from 'antd';
import 'bytemd/dist/index.css';
import 'highlight.js/styles/base16/darcula.css';
import { useState } from 'react';
import styles from './index.less';

const plugins = [gfm(), highlight(), math(), frontmatter()];

const WriteDoc = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.byte}>
      <Select
        style={{
          width: '200px',
        }}
        options={highCssList.map((item) => {
          return {
            value: item,
            label: item,
          };
        })}
      />
      <Editor
        value={value}
        plugins={plugins}
        locale={zh}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
};

export default WriteDoc;
