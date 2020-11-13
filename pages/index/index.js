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
    const { list } = await this.$get('/getList', {
      page: this.data.currentPage,
      limit: this.data.pageSize
    })
    console.log(list)
    if (list && list.length) {
      if(this.data.currentPage === 1) {
        this.setData({
          list
        })
      } else {
        this.setData({
          list: this.data.list.concat(list)
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