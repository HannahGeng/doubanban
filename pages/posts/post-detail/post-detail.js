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

    this.getPostsCollectedSyc();
  },

  // 同步缓存
  getPostsCollectedSyc:function(){

    // 按钮点击事件
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];

    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;

    // 更新文章是否收藏的缓存
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },

  // 异步缓存
  getPostsCollectedAsy:function(){
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        // 更新文章是否收藏的缓存
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      },
    })
  },

  showModal: function (postsCollected,postCollected){

    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected?"是否收藏改文章？":"是否取消收藏？",
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success:function(res){
        if (res.confirm){
          // 更新文章是否收藏的缓存址
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  showToast: function (postsCollected, postCollected){

    // 更新文章是否收藏的缓存址
    wx.setStorageSync('posts_collected', postsCollected);

    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    
     wx.showToast({
      title: postCollected?"收藏成功":"取消成功",
      duration:1000,
      icon:"success"
    })
  },

  onShareTap:function(){

    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success:function(res){
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户分享到' + itemList[res.tapIndex],
          content: '用户是否取消?'+ res.cancel +'现在无法实现分享功能，什么时候能支持呢',
        })
      }
    })
  }

})