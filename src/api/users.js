import request from '@/utils/request'
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 * 登录
 * @returns
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile, code
    }
  })
}

/**
 *获取用户资料
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user'

  })
}
