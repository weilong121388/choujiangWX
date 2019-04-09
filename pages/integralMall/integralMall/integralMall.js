// pages/integralMall/integralMall.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    httpPath: app.data.httpPath,
    arr: [],//接收从后台返回的数据
    arr1: [],//接受商品信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var this_ = this;//作用域问题
    wx.request({
      url: this.data.httpPath + '/index/integral/index',
      method: 'POST',
      success(res) {
        console.log(res);
        if(res.data.code == 0){
          this_.setData({
            arr: res.data.data,
            arr1: res.data.data.goods
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})