// 为了方便项目中使用本地存储的时候写的时候 简化操作 封装 获取 设置 删除
/**
 *获取数据
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
/**
 *设置
 * @param {*} key
 * @param {*} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 *根据key删除本地存储中的其中一个
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
/**
 *删除所有的本地存储
 */
export function cleraItem () {
  window.localStorage.cleraItem()
}
