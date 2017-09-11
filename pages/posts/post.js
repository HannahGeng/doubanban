//接收 posts-dats.js 页面输出的 js 对象
//这里只能用相对路径，不能用绝对路径
 var postsData = require('../../data/posts-data.js');

 Page({
  
    data:{

    },

    /*
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) { 

    //  this.setData.postList = postsData.postList
     this.setData({
       posts_key: postsData.postList
     });
    },

   onPostTap: function(event){

      var postId = event.currentTarget.dataset.postid;
      
      wx.navigateTo({
        url:"post-detail/post-detail?id=" + postId
      })
    },

   onSwiperTap:function(event){
    //  target 和 currentTarget 区别：
    // target 指的是当前点击的组件，而 currentTarget 指的是事件捕获的组件
    // target 这里指的是 image，而 currentTarget 指的是 swiper 组件
     var postId = event.target.dataset.postid;
     wx.navigateTo({
       url: "post-detail/post-detail?id=" + postId
     })
   }
})