var dateTimePicker = require('../../../utils/util.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [{ name: '按时间自动开奖' }, { name: '按人数自动开奖' }, { name: '手动开奖' }],
    isShow:true,
    index:0,
    dateTimeArray:null,
    opentime:null,
    oneimg:"",
    twoimg:"",
    threeimg:"",
    conditions:'',
    tapIndex:0,
    message:"按时间自动开奖",
    onename: "",
    twoname: "",
    threename: "",
    view:"",
    two:true,
    three: true,
    four:false,
    first:false,
    prize:"",
    qa01: "",
    qa02: "",
    qa03: "",
    ans01: "",
    ans02: "",
    ans03: "",
    isredpacket: "2",
    redEnvelope: false,
    blocks:"时间",
    msg:"按照奖品价值的10%",
    bond:"",
    opencondition:"",
    background01:"",
    background02: "",
    background03: "",
    httpPath: app.data.httpPath,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = dateTimePicker.dateTimePicker();
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();

    var firstArray = obj.dateTimeArray.shift();
    var firstTime = obj.dateTime.shift();

    this.setData({
      opentime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray
    });
  },

  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ opentime: e.detail.value });
    // console.log("--111--"+e.detail.value);
  },
  
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      opentime: arr
    });
    // console.log("--222--" + dateArr + "--333--" + arr);
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

  /**
   * 开奖条件
   */
  pickClick() {
    var that = this;
    wx.showActionSheet({
      itemList: ['按时间自动开奖', '按人数自动开奖','手动开奖'],
      success: function (res) { //res.tapIndex点击的列表项
        tapIndex: res.tapIndex;
        console.log(res.tapIndex);
        if (res.tapIndex == 0){
          that.setData({ message: "到达设定时间自动开奖", blocks: "时间", opencondition:"1" })
        } else if (res.tapIndex == 1){
          that.setData({ message: "到达设定人数自动开奖", blocks: "人数", opencondition: "2" })
        } else if (res.tapIndex == 2) {
          that.setData({ message: "发起人手动开奖", blocks: "手动", opencondition: "3" })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 添加一等奖图片
   */
  chooseimage01(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.setData({
          oneimg: res.tempFilePaths[0],
          background01: res.tempFilePaths[0],
        })
        // var array = [];
        // array.push(that.data.oneimg);
        // that.handleImagePreview(array);
      }
    })
  },

  /**
   * 添加二等奖图片
   */
  chooseimage02() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          twoimg: res.tempFilePaths[0],
          background02: res.tempFilePaths[0],
        })
        wx.uploadFile({
          url: '',
          filePath: 'image',
          name: 'file',
          formData: {
            // user: 'test'
          },
          success: function (res) {
            if (res.statusCode == 0) {
              var data = res.data
            }
          }
        })
        handleImagePreview(that.data.twoimg);
      }
    })
  },

  /**
   * 添加三等奖图片
   */
  chooseimage03() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          threeimg: res.tempFilePaths[0],
          background03: res.tempFilePaths[0],
        })
        wx.uploadFile({
          url: '',
          filePath: 'image',
          name: 'file',
          formData: {
            // user: 'test'
          },
          success: function (res) {
            if (res.statusCode == 0) {
              var data = res.data
            }
          }
        })
        handleImagePreview(that.data.threeimg);
      }
    })
  },

  /**
   * 预览本地图片
   */
  handleImagePreview(array){
    wx.previewImage({
      urls: array
    })
  },

  /**
   * 添加奖品
   */
  addPrize(e){
    console.log(e)
    console.log(e.currentTarget.id);
    if (e.currentTarget.id == "first"){
      this.setData({ two:false,first:true })
    } else if (e.currentTarget.id == "two"){
      this.setData({ three: false,four:true })
    }
  },

  /**
   * 选择红包
   */
  switch1Change(e){
    console.log(e)
    if(e.detail.value == true){
      this.setData({ redEnvelope: true, isredpacket: "1"})
    } else {
      this.setData({ redEnvelope: false, isredpacket: "2" })
    }
  },
  
  /**
   * 选择保证金额
   */
  priceClick() {
    var that = this;
    wx.showActionSheet({
      itemList: ['按照奖品价值10%', '按照奖品50%', '按照奖品100%'],
      success: function (res) { //res.tapIndex点击的列表项
        tapIndex: res.tapIndex;
        console.log(res.tapIndex);
        if (res.tapIndex == 0) {
          that.setData({ msg: "按照奖品价值10%", bond:"1"})
        } else if (res.tapIndex == 1) {
          that.setData({ msg: "按照奖品50%", bond: "2"})
        } else if (res.tapIndex == 2) {
          that.setData({ msg: "按照奖品100%", bond: "3"})
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 表单提交
   */
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //console.log(this.data.isredpacket);
    
    data = { isredpacket: this.data.isredpacket, oneimg: this.data.oneimg, onename: e.detail.value.onename, twoimg: this.data.twoimg, twoname: e.detail.value.twoname, opencondition: this.data.opencondition, opentime: this.data.opentime, opennum: e.detail.value.opennum, lotterynotes: e.detail.value.lotterynotes, goodvalue: e.detail.value.lotterynotes, sponsor: e.detail.value.sponsor, sponsorintro: e.detail.value.sponsorintro, sponsorpoone: e.detail.value.sponsorpoone, sponsorimg: this.data.sponsorimg, bond: this.data.bond, redmoney: e.detail.value.redmoney, rednumber: e.detail.value.rednumber};

    app.request('/index/drawlottery/draw', 'POST', data)
      .then((res) => {
        console.log(res);

      })
  },
})