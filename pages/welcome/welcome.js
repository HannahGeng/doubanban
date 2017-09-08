Page({

  onContentTap:function(){
    // 页面跳转，存在父子关系，有返回键
    // wx.navigateTo({
    //   url:"../posts/post"
    // });

    // 没有返回键
    wx.redirectTo({
      url:"../posts/post"
    });

  }

})