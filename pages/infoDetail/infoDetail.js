// pages/infoDetail/infoDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '请选择',
    array: ['发电机', '充电器', '引擎动力', '其他'],
    objectArray: [
      {
        id: 0,
        name: '发电机'
      },
      {
        id: 1,
        name: '充电器'
      },
      {
        id: 2,
        name: '引擎动力'
      },
      {
        id: 3,
        name: '其他'
      }
    ],

    userPhone: '',
    userName: '',
    userComp: '',
    userCompPhone: '',
    userCompExtenNumber: '',
    userAddress: '',

    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  clearFont() {
    this.setData({
      placeholder: ''
    })
  },

  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  // 手机号码的双向绑定
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

  // 公司电话
  userCompPhone: function (e) {
    this.setData({
      userCompPhone: e.detail.value
    })
  },

  // 公司地址
  userAddress: function (e) {
    this.setData({
      userAddress: e.detail.value
    })
  },

  // 分机号码
  userCompExtenNumber: function (e) {
    this.setData({
      userCompExtenNumber: e.detail.value
    })
  },


  //点击保存按钮获取所以信息
  // 发送给后台
  // 同时清空所以的信息

  // 获取所以的信息
  save: function (e) {
    var userName = this.data.userName
    var userComp = this.data.userComp
    var userAddress = this.data.userAddress
    var userPhone = this.data.userPhone
    var userCompPhone = this.data.userCompPhone
    var userCompExtenNumber = this.data.userCompExtenNumber

    // 产品服务
    var index = this.data.index
    // 公司地址
    var region = this.data.index

    console.log(userName, userComp, userAddress, userPhone, userCompPhone, userCompExtenNumber, index, region)

    // 清空表单元素
    this.setData({
      userName: '',
      userComp: '',
      userAddress: '',
      userPhone: '',
      userCompPhone: '',
      userCompExtenNumber: '',
      value: '',
      placeholder: '请选择',
      index: '',
      region: ['广东省', '广州市', '海珠区']
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})
