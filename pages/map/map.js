
// 地图标记点
var markers = []
// 地图标记点的气泡
var callout = []

// 获取应用实例
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk
const utils = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    marker_latitude: '',
    marker_longitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: utils.getRequestUrl + '/Api/Services/GetAllServiceFacilitatorMap',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data.Data)
        that.setData({
          listData: res.data.Data
        })

        var listData = res.data.Data
        for (var i = 0; i < listData.length; i++) {
          markers = markers.concat({
            iconPath: "../../img/location.png",
            id: listData[i].FacilitatorId,
            callout: {
              content: listData[i].Contact + '\n' + listData[i].FacilitatorName + '\n' + listData[i].Address,
              fontSize: '16',
              padding: true,
              color: '#444',
              display: 'BYCLICK',
              textAlign: 'center',
              borderRadius: 15
            },
            latitude: listData[i].Latitude,
            longitude: listData[i].Longitude,
            width: 20,
            height: 20
          })
        }
        console.log(markers)
        that.setData({
          markers: markers,
          latitude: listData[0].Latitude,
          longitude: listData[0].Longitude
        })
        
        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            var latitude = res.latitude
            var longitude = res.longitude
          },
        })
      }
    })

    var that = this
    wx.showLoading({
      title: '定位中',
      mask:true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true,//高精度定位
      //定位成功，更新定位结果
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        that.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })
      },
      //定位失败回调
      fail: function () {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },

      complete: function () {
        //隐藏定位中信息进度
        wx.hideLoading()
      }

    })
    qqmapsdk = new QQMapWX({
      key: 'NHCBZ-LR3CI-SHPGY-5Y2AK-I4NGE-6HBXX'
    })
  },


  // 实现搜索的功能
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表单所有name=id的值  
    console.log(formData)
    wx.request({
      url: utils.getRequestUrl+'/Services/GetAllServiceFacilitatorMap',
      data: {
        Content: formData || null,
        FacilitatorTypeId: '',
        Province: '',
        TypeId: '',
        BrandId: ''
      },
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          re: res.data.Data,
        })
        wx.showToast({
          title: '已提交',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },


  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      oneContent: name,
      towContent: name,
      select: false
    })
  },


  bindViewTap: function () {
    console.log("bindViewTap")
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      re: ''
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      re: ''
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.inputTips(e.detail.value)
  },

  // 提供一个方法，进行跳转
  select: function (e) {
    var that= this
    console.log(e.currentTarget.dataset.object)
    console.log(e.currentTarget.dataset.object.Latitude,e.currentTarget.dataset.object.Longitude);
    // console.log('我出来了')

   var listObj = e.currentTarget.dataset.object
    
    var latitude = 30.3334444
    var longitude = 120.7654321

    markers = markers.concat({
      iconPath: "../../img/marker_red.png",
      // id: listData[i].FacilitatorId,
      callout: {
        content: listObj.Contact + '\n' + listObj.FacilitatorName + '\n' + listObj.Address,
        fontSize: '16',
        padding: true,
        color: '#444',
        display: 'BYCLICK',
        textAlign: 'center',
        borderRadius: 15
      },
      latitude: latitude,
      longitude: longitude,
      width: 20,
      height: 20
    })

    that.setData({
      markers: markers,
      latitude: latitude,
      longitude: longitude
    })

    // 恢复搜素框的样式 
    // 调用隐藏的方法
    this.hideInput()
  },

  //搜索提示搜索关键字
  inputTips(param) {
    var that = this

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

  regionchange(e) {
    console.log(e.type)
  },

  controltap(e) {
    console.log(e.controlId)
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