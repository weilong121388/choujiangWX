// pages/template/footer/footer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpPath: app.data.httpPath,
    arr: [],
    arr1: [],
    img_one: [
      'arr.img', 
      '../../../img/gongxixiangqing@2x.png', 
      '../../../img/gongxixiangqing@2x.png',
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 6000,  //间隔时间
    duration: 3000,  //滑动时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var this_ = this;
    wx.request({
      url: this.data.httpPath + '/index/member/company',
      method: "post",
      success: function (res) {
        console.log(res);
        this_.setData({
          arr: res.data.data[0],
          arr1: res.data.data[1],
        })
      },
      fail: function (err) {
        console.log(err.data.meg)
      },
    });
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