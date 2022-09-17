import zh from '@/common/zh-cn.json';
import { getOssConfig } from '@/services/egg-blog/user';
import { ossPut } from '@/utils/oss';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.css';
import 'highlight.js/styles/base16/darcula.css';
import React, { useState } from 'react';
import styles from './index.less';

const plugins = [gfm(), highlight(), math(), frontmatter()];

const handleGetOssConfig = async () => {
  try {
    return await getOssConfig();
  } catch (e) {
    return null;
  }
};

const WriteDoc: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.byte}>
      {/*<Select*/}
      {/*  style={{*/}
      {/*    width: '200px',*/}
      {/*  }}*/}
      {/*  options={highCssList.map((item) => {*/}
      {/*    return {*/}
      {/*      value: item,*/}
      {/*      label: item,*/}
      {/*    };*/}
      {/*  })}*/}
      {/*/>*/}
      <input className={styles.input} />
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
