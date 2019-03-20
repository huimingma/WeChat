//获取应用实例  
var app = getApp()
const utils = require('../../utils/util.js')

Page({
  data: {
    userComp: '上海水点网络有限公司',
    userPhone: '15566889911',
    userAddress: '上海市嘉定区同嘉科技广场',
    userName: '赵博士',
    userCompPhone: '666666',
    userCompExtenNumber: '888888',

    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    listData:[],
    // img:[]
  },

  

  onLoad:function(){
    // 图片问题有待解决
    // var img = wx.getStorageSync("imgs")
    // console.log(img)
    // 发送请求获取所添加的公司
    var that = this
    var cookie = wx.getStorageSync("sessionId")
    console.log(cookie)
    wx.request({
      url: utils.getRequestUrl +'/WeChat/Services/GetServiceFacilitatorManage?page=1&sessionId='+cookie, 
      method:'POST',
      data: {
        Person:true
      },
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        console.log(res.data.Data)
        that.setData({
          listData:res.data.Data,
          // img:img
        })
      }
    })
  },

  // 手机号
  userPhone: function (e) {
    if (!(/^1[34578]\d{9}$/.test(e.detail.value))) {
      wx.showToast({
        title: '手机号码格式不正确',
        duration: 200,
        icon: 'none',
        mask: true
      })
      this.setData({
        userPhone: ''
      })
      return false
    } else {
      this.setData({
        userPhone: e.detail.value
      })
    }
  },

  // 姓名
  userName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  // 公司名称
  userComp: function (e) {
    this.setData({
      userComp: e.detail.value
    })
  },

  // 地址
  userAddress: function (e) {
    this.setData({
      userAddress: e.detail.value
    })
  },

  //电话号码
  userCompPhone: function (e) {
    this.setData({
      userCompPhone: e.detail.value
    })
  },

  // 分机号码
  userCompExtenNumber: function (e) {
    this.setData({
      userCompExtenNumber: e.detail.value
    })
  },

  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  }

})