// pages/template/footer/footer.js
const app = getApp();
Page({
  data: {
    showView: false,
    jifshow:false,
    httpPath: app.data.httpPath,
    money: '',
    point: '',
    bond: '',
    redmoney: '',
    ecommoney: '',
    radio:'money'
  },
  radioChang:function(e){
    this.setData({
      radio: e.detail.value
    })
  },
  show:function(){
    this.setData({
      showView: (true)
    })
  },
  jifen:function(){
    app.request('/index/member/point', 'POST', '')
      .then((res) => {
        let ree = res.data
        console.log(ree);
        if (ree.msg == "您的积分不足，请使用微信支付" && ree.code == (-1)) {
          this.setData({
            jifshow: (true)
          })
        }
      })
  },
  click: function() {
      console.log(this.data.radio)
    if (this.data.radio == 'money'){
        // console.log(1)
      this.jifen()
      }
  },
  not: function() {
    this.setData({
      showView: (false)
    })
  },
  ajax: function() {
    app.request('/index/member/setting', 'POST', '')
      .then((res) => {
        console.log(res);
        let ree = res.data
          this.setData({
            money: ree.data.money,
            point: ree.data.point,
            bond: ree.data.bond || '0.00',
            redmoney: ree.data.redmoney || '0.00',
            ecommoney: ree.data.ecommoney || '0.00'
          })
      })  
    // wx.request({
    //   url: this.data.httpPath + '/index/member/setting',
    //   　　method: 'POST',
    //   　　success: (res) => {
    //     let ree = res.data
    //     this.setData({
    //       money: ree.data.money,
    //       point: ree.data.point,
    //       bond: ree.data.bond
    //     })
    //     if (ree.code == 0) {
    //       setTimeout(function() {
    //         wx.navigateBack();
    //       }, 1000)
    //     }
    //     console.log(ree);
        // wx.showToast({
        //   title: '成功',
        //   icon: 'success',
        //   duration: 2000
        // })
    //   }
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.ajax()
    // this.login()
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

  }
})