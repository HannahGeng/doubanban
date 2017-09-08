var postsData = require('../../../data/posts-data.js')

Page({

  data: {

  },

  onLoad: function(options) {
    
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];

    // 如果在onload 中不是异步的去执行一个数据绑定
    // 则不需要使用 this.setData 方法
    this.setData({
      postData: postsData.postList[postId]
    });

    // 控制收藏图片状态（较复杂）
    var postsCollected = wx.getStorageSync('posts_collected')
    if(postsCollected){
        var postCollected = postsCollected[postId]
        this.setData({
          collected: postCollected
        })
    }
    else
    {
      var postsCollected = {}
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },

  onCollectionTap:function(event){

    // 按钮点击事件
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];

    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;

    // 更新文章是否收藏的缓存
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);

    // 更新数据绑定
    this.setData({
      collected:postCollected
    })
  }

})