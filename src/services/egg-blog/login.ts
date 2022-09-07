// @ts-ignore
/* eslint-disable */
import { HttpMethod } from '@/utils/HttpType';
import { request } from '@umijs/max';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: HttpMethod.GET,
    params: {
      ...params,
    },
    ...(options || {}),
  });
}