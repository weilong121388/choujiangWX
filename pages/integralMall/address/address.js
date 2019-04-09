// pages/integralMall/address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpPath: app.data.httpPath,
    region: ['请', '选', '择'],//一开始显示的地址
    gid:'',//接收上一页传过来的商品ID
    oid: '',//接收上一页传过来的订单ID
    orderId: '',//接收上一页传过来的订单号
    name: '',//姓名
    mobile: '',//手机号
    province: '',//省ID
    city: '',//市ID
    area: '',//区ID
    detail: '',//详细地址
    arr: [],//接收商品信息
    img: '',//商品图片
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取上一页传过来的商品id
    this.setData({
      gid: options.gid,
      oid: options.oid,
      orderId: options.orderId,
    });
    // 获取商品信息
    var this_ = this;
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
            img: res.data.data.imgs[0]
          });
        }
      },
    })
  },
  // 获取输入的姓名
  getNameValue: function(e){
    this.setData({
      name: e.detail.value,
    })
  },
  //获取输入的手机号
  getMobileValue: function (e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  //获取省市区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.code[0],//获取省ID
      city: e.detail.code[1],//获取市ID
      area: e.detail.code[2]//获取区ID
    })
    console.log(this.data.province, this.data.city, this.data.area)
  },
  //获取输入的详细地址
  getDetailValue: function (e) {
    this.setData({
      detail: e.detail.value,
    })
  },
  
  //点击提交按钮
  sub: function(){
    var this_ = this;
    //信息是否填完
    if (this.data.name == '' || this.data.mobile == '' || this.data.province == '' || this.data.detail == ''){
      wx.showToast({
        title: '信息不完整，请完善信息',
        icon: 'none'
      })
    }
    //验证手机号
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.mobile))) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
    }
    else{
      wx.request({
        url: this.data.httpPath + '/index/integral/order',
        method: 'POST',
        data: {
          gid: this_.data.gid,
          oid: this_.data.oid,
          orderId: this_.data.orderId,
          name: this_.data.name,
          mobile: this_.mobile,
          province: this_.data.province,
          city: this_.data.city,
          area: this_.data.area,
          detail: this_.data.detail
        },
        success(res) {
          console.log(res);
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          setTimeout(()=>{
            wx.navigateBack({
              url: '/pages/integralMall/detail/detail'
            })
          },2000)
        },
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