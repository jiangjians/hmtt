import request from '@/utils/request'
/**
 *获取新闻详情
 * @param {*} article_id
 * @returns
 */
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
/**
 *关注用户
 * @param {用户id} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}
/**
 *取消用户
 * @param {用户id} target
 * @returns
 */
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}
/**
 *收藏文章
 * @param {收藏文章的id} target
 * @returns
 */
export const addCollected = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
/**
 *取消收藏文章
 * @param {收藏文章的id} target
 * @returns
 */
export const delCollected = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
