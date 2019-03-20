//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.switchTab({
                url: '../map/map',
              })
              wx.login({
                success: res => {
                  console.log("用户的code:" + res.code);
                  wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=	wx55d9499e5ca87c16&secret=080b8e9d5c5aee04d48729e1d3ec02fa&js_code=' + res.code + '&grant_type=authorization_code',
                    success: res => {
                      // 获取到用户的 openid
                      console.log("用户的openid:" + res.data.openid);
                    }
                  });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);


      // 把用户的信息存储到storage中
      wx.setStorageSync('info', e.detail);

      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });

      wx.getStorage({
        key: 'info',
        success: function (res) {
          var info = res.data
          var UnioId = info.iv
          var Name = info.userInfo.nickName
          var Country = info.userInfo.country
          var HeaderImageUrl = info.userInfo.avatarUrl
          // console.log(UnioId, Name, Country, HeaderImageUrl)
          // 接口
          wx.request({
            url: 'http://101.200.182.221:8001/Api/Account/WeixinLogin',
            data: {
              UnioId: UnioId,
              Name: Name,
              Country: Country,
              HeaderImageUrl: HeaderImageUrl
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            success(res) {
              console.log(res.data)
              console.log(res.data.Data.sessionId)
              //把sessionId存储起来
              wx.setStorage({
                key: 'sessionId',
                data: res.data.Data.sessionId
              })
            }
          })
        },
      })

      // 跳转到tab的页面上去
      wx.switchTab({
        url: '../../pages/map/map'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})