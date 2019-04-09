//app.js
App({
  data: {
    //后台接口域名
    httpPath: "http://koi.32one.top",
    //token
    token: {
      token: ''
    }
  },
  //登录
  login() {
    var _this = this;
    wx.login({
      success: res => {
        console.log(res);
        wx.request({
          url: _this.data.httpPath + '/index/login/login',
          method: 'POST',
          data: {
            code: res.code
          },
          success(res) {
            //将自定义登录状态存入缓存
            wx.setStorage({
              key: 'token',
              data: res.data.token,
              success: function(res) {
                console.log(res);
              }
            })
          }
        })
      }
    })
  },
  //封装request方法
  request(url, method, data = {}) {
    var promise = new Promise((resolve, reject) => {
      var _this = this;
      var subData;
      //获取自定义状态缓存
      wx.getStorage({
        key: 'token',
        success: function(res) {
          console.log(res);
          if (res.data != null) {
            _this.data.token.token = res.data;
          };
        }
      });
      subData = Object.assign({}, _this.data.token, data);
      //执行request方法
      wx.request({
        url: _this.data.httpPath + url,
        method: method,
        data: subData,
        success: function(res) {
          if (res.data.code == -2) {
            _this.login();
            _this.request(url, method, data);
          } else {
            resolve(res);
          }
        },
      })
    });
    return promise;
  },
  onLaunch: function() {
    //执行登录方法
    this.login();

    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    // userInfo: null
  }
})