Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtanchu: false,//是否显示弹出层
    showdati: false,//是否显示答题层
    qing: '请输入答案',//input框默认值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  //点击显示弹出层
  tanchu: function () {
    this.setData({
      showtanchu: true
    });
  },
  // 点击取消时触发
  quxiao: function () {
    this.setData({
      showtanchu: false
    });
  },
  // 点击去答题
  dati: function () {
    this.setData({
      showtanchu: false,
      showdati: true,
    });
  },
  // 点击下一题
  next: function () {
    this.setData({

        showdati: false,
        daan: true,
      
    });
  },
  // 点击确定
  sub: function () {
    this.setData({
      daan: false,
    });
  },
})