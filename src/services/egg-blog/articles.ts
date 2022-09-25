import { HttpMethod } from '@/utils/HttpType';
import { request } from '@umijs/max';

/** 获取全部文章 GET /api/articles */
export async function getArticlesAll(params: any) {
  return request('/api/articles/list', {
    method: HttpMethod.GET,
    params,
  });
}

/** 获取文章详情 GET /api/articles */
export async function getArticle(params: any) {
  return request(`/api/articles/${params.id}`, {
    method: HttpMethod.GET,
  });
}

/** 添加文章 POST /api/articles */
export async function addArticle(params: any) {
  return request('/api/articles', {
    method: HttpMethod.POST,
    data: {
      ...params,
    },
  });
}

/** 更新文章 PUT /api/articles */
export async function updateArticle(params: any) {
  return request('/api/articles', {
    method: HttpMethod.PUT,
    data: {
      ...params,
    },
  });
}

/** 删除文章 DELETE /api/articles */
export async function removeArticle(params: any) {
  return request(`/api/articles/${params.id}`, {
    method: HttpMethod.DELETE,
  });
}
