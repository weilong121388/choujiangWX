const app = getApp();
Page({
  data: {
    httpPath: app.data.httpPath,
    list: [{
        title: "月卡套餐",
        price: "30",
        istuijian: false,
      },
      {
        title: "半年卡套餐",
        price: "150",
        istuijian: false,
      },
      {
        title: "年卡套餐",
        price: "280",
        istuijian: true,
      },
    ],
    on: 0, //切换套餐的参数
    showInfo: true, //是否显示完善信息
  },
  //切换套餐
  tab: function(event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      on: index
    });
  },
  //显示隐藏完善信息弹窗
  toggleInfo() {
    this.setData({
      showInfo: !this.data.showInfo
    })
  },
  onLoad() {

  }
})