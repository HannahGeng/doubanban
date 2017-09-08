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
    }
})