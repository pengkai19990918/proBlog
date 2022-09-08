// import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { getToken } from '@/utils/authority';
import { getLocale } from '@@/plugin-locale';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import Cookies from 'js-cookie';
import type { RequestConfig } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/egg-blog/api';

const isDev = process.env.NODE_ENV === 'development';
const homePath = '/home';
const DEFAULT_TIMEOUT = 2 * 60 * 1000;

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(homePath);
    }
    return undefined;
  };

  if (getToken()) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  // 如果不是登录页面，执行
  // if (history.location.pathname === homePath) {
  //   const currentUser = await fetchUserInfo();
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: defaultSettings,
  //   };
  // }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    contentStyle: { backgroundColor: '#f4f5f5', margin: '0' },
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => false,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== homePath) {
        history.push(homePath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

const getHeaders = (options: RequestOptionsInit) => {
  const csrftoken = Cookies.get('csrfToken');

  const localeHeaders = {
    'x-csrf-token': csrftoken, // csrftoken eggjs
    authorization: getToken(), // Token
    language: getLocale(), // 当前语言
  };

  return {
    ...(options?.headers || {}),
    ...localeHeaders,
  } as HeadersInit;
};

export const request: RequestConfig = {
  timeout: DEFAULT_TIMEOUT,
  // other axios options you want
  errorConfig: {
    // errorHandler,
    errorThrower() {},
  },
  requestInterceptors: [
    (url, options) => {
      // do something
      const headers = getHeaders(options);
      // api请求拦截
      return {
        url,
        options: {
          ...options,
          headers,
          timeout: DEFAULT_TIMEOUT,
          interceptors: true,
        },
      };
    },
  ],
  responseInterceptors: [
    (response: any) => {
      // const { data = {} as any, config } = response;
      // const authorization = config.headers.get('authorization');
      // if (authorization) {
      //   setToken(authorization);
      // }
      return response;
    },
  ],
};
