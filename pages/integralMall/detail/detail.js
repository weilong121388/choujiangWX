// pages/integralMall/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpPath: app.data.httpPath,
    imgUrls: [],// 轮播图数组
    num:1,//轮播图页数
    showtanchu: false,//是否显示弹出层
    gid: '',//上一页传过来的商品ID
    arr: [],//接受后台返回的数据
    arr1: [],//点击兑换按钮获取到的数据
    btntxt: false,//true显示复制微信号，false显示填写地址
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取商品ID
    this.setData({
      gid: options.id
    });
    var this_ = this;
    //获取积分产品详情
    wx.request({
      url: this.data.httpPath + '/index/integral/goodsinfo',
      method: 'POST',
      data: {
        gid: this.data.gid
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          this_.setData({
            arr: res.data.data,
            imgUrls: res.data.data.imgs
          });
        }
      },
    })
  },
  // 当轮播图滑动时改变num的值
  numchange: function(){
    this.data.num = this.data.num + 1;
    if(this.data.num == this.data.imgUrls.length+1){
      this.data.num = 1
    }
    this.setData({
      num: this.data.num
    })
  },
  // 返回上一页
  goback: function(){
    wx.switchTab({
      url: '/pages/integralMall/integralMall/integralMall',
    })
  },
  //点击提交按钮
  tanchu:function(){
    var this_ = this
    wx.request({
      url: this.data.httpPath + '/index/integral/conversion',
      method: 'POST',
      data: {
        gid: this.data.gid
      },
      success(res) {
        console.log(res);
        if (res.data.code == 1) {
          this_.setData({
           arr1: res.data.data,
           showtanchu: true,
           btntxt: false
          });
        }
        else if (res.data.code == -1){
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        else{
          this_.setData({
            arr1: res.data.data,
            showtanchu: true,
            btntxt: true
          });
        }
      },
    })
  },
  // 点击取消时触发
  quxiao: function () {
    this.setData({
      showtanchu: false
    });
  },
  // 点击复制微信号或收货地址
  queding: function () {
    this.setData({
      showtanchu: false
    });
    var this_ = this;
    if(this_.data.btntxt){
      // 复制微信号
      wx.setClipboardData({
        data: this_.data.arr1.wechat,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data) // data
            }
          })
        }
      })
    }else{
      // 跳转到填写地址页面
      wx.navigateTo({
        url:'/pages/integralMall/address/address?gid={{arr1.gid}}&oid={{arr1.oid}}&orderId={{arr1.orderId}}'
      })
    }
   
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