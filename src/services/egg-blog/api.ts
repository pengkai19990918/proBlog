// @ts-ignore
/* eslint-disable */
import { HttpMethod } from '@/utils/HttpType';
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/user/currentUser', {
    method: HttpMethod.GET,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<any>('/api/user/login', {
    method: HttpMethod.POST,
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/register */
export async function register(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<any>('/api/user/register', {
    method: HttpMethod.POST,
    data: body,
    ...(options || {}),
  });
}
