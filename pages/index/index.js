// pages/index/index.js

import Router from '../../utils/index'

Router({
  data: {
    list: [],
    currentPage: 1,
    pageSize: 10,
    canNextPage: false,
  },

  async getList() {
    const data = await this.$get('/posts', {
      _page: this.data.currentPage,
      _limit: this.data.pageSize
    })
    if (data && data.length) {
      if(this.data.currentPage === 1) {
        this.setData({
          list: data
        })
      } else {
        this.setData({
          list: this.data.list.concat(data)
        })
      }
      this.setData({
        canNextPage: true
      })
    } else {
      this.setData({
        canNextPage: false
      })
      this.$tips('no more')
    }
  },

  onLoad() {
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.currentPage++
    if(this.data.canNextPage) {
      this.getList()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.currentPage = 1
    this.getList()
    wx.stopPullDownRefresh()
  },


})