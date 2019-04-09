// pages/template/footer/footer.js
const app = getApp();
var mtabW;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    httpPath: app.data.httpPath,
    tabs: ["成就值", "积分", "获奖次数", "发起抽奖"],
    boss:'',//boss
    cheng:'',//成就值
    jifen:'',//积分
    huo:'',//获奖次数
    faqi: '',//发起抽奖次数
    activeIndex: 0,
    slideOffset: 0,
    tabW: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var this_ = this;
    wx.request({
      url: this.data.httpPath + '/index/member/ranking',
      method: "post",
      success: function (res) {
        console.log(res);
        this_.setData({
          boss:res.data.data.data,//boss
          cheng: res.data.data.achievements,//成就值
          jifen: res.data.data.integral,//积分
          huo: res.data.data.numberAward,//获奖次数
          faqi: res.data.data.numberLotterie,//发起抽奖次数
        })
        console.log(achievements)
      },
      fail: function (err) {
        console.log(err.data.meg)
      },
    });
    //
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        mtabW = res.windowWidth / 4;
        that.setData({
          tabW: mtabW
        })
      }
    });

  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tabClick: function (e) {
    var that = this;
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft;  //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
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

  },
  // tab 切换的方法
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  }
})