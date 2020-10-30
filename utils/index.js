const request = (method, url, data) => {
  return new Promise((resolve, reject)=>{
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method,
      url: 'http://jsonplaceholder.typicode.com'+ url,
      data,
      success(res) {
        resolve(res.data)
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}

/**
 * 通过get 方法请求url
 * @param {String} url url地址
 * @param {Object} data 要传的数据 
 */
export const $get = (url, data) => {
  return request('GET', url, data)
}

export const $post = (url, data) => {
  return request('POST', url, data)
}

export const $d = (e, key) => {
  let res = e.currentTarget.dataset
  return key ? res[key] : res
}

export const $tips = (tips) => {
  wx.showToast({
    title: tips,
    icon: 'none'
  })
}


/**
 * 统一页面对象，封装了Page，添加了自定义方法
 * @param {*} option 同原本的Page参数
 */

export default function Router(option) {
  option.$get = $get
  option.$post = $post
  option.$d = $d
  option.$tips = $tips

  Page(option)
}