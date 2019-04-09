const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpPath: app.data.httpPath,
    con: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var this_ = this;
    wx.request({
      url: this.data.httpPath + '/index/member/welfare',
      method: 'POST',
      success(res) {
        // console.log(1,res);
        this_.setData({
          con: res,
        })
        // console.log(this_.con)
      },
    });

  },
  qiandao: function() {
    console.log(111)

    wx.request({
      url: this.data.httpPath + '/index/sign/sign',
      method: 'POST',
      success: function(res) {
        wx.showToast({
          title: '签到成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      },
      fail: function(err) {
        wx.showToast({
          title: '签到失败',
          icon: 'loadingf',
          duration: 1000,
          mask: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**弹出 */
  tanchu: function() {
    this.qiandao(); //签到接口
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
})