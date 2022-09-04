import { getIntl, getLocale } from '@@/plugin-locale/localeExports';
import type { MessageDescriptor } from '@ant-design/pro-layout/lib/typings';
import type { PrimitiveType } from 'intl-messageformat';
import { parse } from 'querystring';

// /* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// For the official demo site, it is used to turn off features that are not needed in the real development environment
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const formatMessage = (
  descriptor: MessageDescriptor,
  values?: Record<string, PrimitiveType>,
): string => {
  const useIntl = getIntl(getLocale());
  return useIntl.formatMessage(descriptor, values);
};

export const splicingUrlParams = (obj: any) => {
  let str = '';
  Object.keys(obj).forEach((item) => {
    if (obj[item]) {
      str += `${item}=${obj[item]}&`;
    }
  });
  return str.substring(0, str.length - 1);
};

export const csrfSafeMethod = (method: string) => {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
};

export const getResponseCode = (response: any) => {
  if (!response?.code || response.code !== 200) {
    throw new Error(response);
  }
};
