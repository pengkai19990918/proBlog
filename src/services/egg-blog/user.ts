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

/** 获取oss配置 GET /api/user/oss */
export async function getOssConfig() {
  return request('/api/user/oss', {
    method: HttpMethod.GET,
  });
}

/** 获取用户自己的所有文章 GET /api/user/articles */
export async function getUserArticlesAll(params: any) {
  return request(`/api/user/articles/${params.id}`, {
    method: HttpMethod.GET,
  });
}
