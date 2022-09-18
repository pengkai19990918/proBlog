import style from '@/assets/style.svg';
import type { BytemdAction, BytemdPlugin } from 'bytemd';

export default function changeCodeStylePlugin(highCssList: string[]): BytemdPlugin {
  const changeCodeStyle = (type: string) => {
    import(`highlight.js/styles/base16/${type}`);
  };

  const cssList: BytemdAction[] = highCssList.map((item: any) => {
    const lastIndex = item.lastIndexOf('.');
    const title = item.substring(0, lastIndex);
    return {
      title: title,
      handler: {
        type: 'action',
        click() {
          changeCodeStyle(item);
        },
      },
    };
  });

  return {
    // to be implement
    actions: [
      {
        title: '代码高亮样式',
        icon: `<img src=${style} />`, // 16x16 SVG icon
        handler: {
          type: 'dropdown',
          actions: cssList,
        },
      },
    ],
  };
}
