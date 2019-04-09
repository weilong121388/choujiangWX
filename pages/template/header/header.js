Component({
  properties: {
    //头部文字，通过text=""传值
    text: {
      type: String,
      value: ""
    },
    //图片路径，通过imgPath=""传值
    imgPath: {
      type: String,
      value: ""
    },
    //右侧文字，通过rightTitle=""传值
    rightTitle: {
      type: String,
      value: ""
    },
    //右侧跳转的链接，通过urlPath=""传值
    urlPath: {
      type: String,
      value: ""
    }
  },
  methods: {
    //返回按钮
    back() {
      wx.navigateBack();
    }
  },
  options: {
    addGlobalClass: true, //使组件接受全局样式
  },
  externalClasses: ['my-class'] //外部样式类
})