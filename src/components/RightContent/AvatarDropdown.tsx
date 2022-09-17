import Login from '@/pages/User/Login';
import Register from '@/pages/User/Register';
import { outLogin } from '@/services/egg-blog/login';
import { removeToken } from '@/utils/authority';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, Menu, Space, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  removeToken();
  const { search, pathname } = history.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/' && !redirect) {
    history.replace({
      pathname: '/',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const [loginFormVisible, handleLoginFormVisible] = useState<boolean>(false);
  const [registerFormVisible, handleRegisterFormVisible] = useState<boolean>(false);

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const login = (
    <>
      <Space>
        <Button
          onClick={() => {
            handleLoginFormVisible(true);
          }}
        >
          登录
        </Button>
        <Button
          onClick={() => {
            handleRegisterFormVisible(true);
          }}
        >
          注册
        </Button>
      </Space>
      <Login
        visible={loginFormVisible}
        onCancel={() => {
          handleLoginFormVisible(false);
        }}
      />
      <Register
        visible={registerFormVisible}
        onCancel={() => {
          handleRegisterFormVisible(false);
        }}
      />
    </>
  );

  const { currentUser } = initialState;
  if (!currentUser) {
    return login;
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>
          {currentUser.nickname || currentUser.username}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
