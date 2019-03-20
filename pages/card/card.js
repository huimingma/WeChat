const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
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
    userAddress: '',


    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  // 手机号码的双向绑定
  userPhone: function (e) {
    if (!(/^1[34578]\d{9}$/.test(e.detail.value))) {
      wx.showToast({
        title: '手机号码格式不正确',
        duration: 2000,
        icon: 'none',
        mask: true,
      });
      this.setData({
        userPhone: ''
      })
      return false;

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

  // 具体地址
  userAddress: function (e) {
    this.setData({
      userAddress: e.detail.value
    })
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

  // 点击上传按钮获取所有的信息
  // 同时清空表单元素

  // 获取所有的信息
  orderMeeting: function (e) {
    var userName = this.data.userName
    console.log(userName)

    // 公司名
    var userComp = this.data.userComp
    console.log(userComp)

    var userAddress = this.data.userAddress
    console.log(userAddress)

    var userPhone = this.data.userPhone
    console.log(userPhone)

    // 产品服务
    var index = this.data.index
    console.log(index, this.data.array[index])

    // 公司地址
    var region = this.data.region
    console.log(region)

    var imgs = this.data.imgs
    console.log(imgs)

    // 测试，存储到storage中
    wx.setStorage({
      key: 'imgs',
      data: imgs,
    })

    var cookie = wx.getStorageSync("sessionId")
    console.log(cookie)

    wx.request({
      url: utils.getRequestUrl + '/WeChat/Services/AddServiceFacilitator?sessionId=' + cookie,
      method: 'POST',
      data: {
        FacilitatorTypeId: index,
        FacilitatorName: userComp,
        Contact: userName,
        Phone: userPhone,
        Address: userAddress,
        Province: region[0],
        City: region[1],
        IsNeedCorrection: true             
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })


    // 图片资源    
    // wx.uploadFile({
    //   url: utils.getRequestUrl + '/WeChat/Services/AddServiceFacilitator?sessionId=' + cookie,
    //   filePath: tempFilePaths[0],
    //   name: 'file',
    //   formData: {
    //     user: 'test'
    //   },
    //   success(res) {
    //     const data = res.data
    //     // do something
    //   }
    // })




    // 清空表单元素
    this.setData({
      userName: '',
      userComp: '',
      userAddress: '',
      userPhone: '',
      placeholder: '请选择',
      index: '',
      region: ['广东省', '广州市', '海珠区'],
      imgs: []

    })
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