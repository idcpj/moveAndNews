// pages/posts/posts.js
var post_content = require('../../data/posts-data.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        postList:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //假设从服务器获取值
        // this.data.postList = post_content.postList;
        this.setData({ postList: post_content.postList });
    },
    //传id
    toPostDetail:function(event){
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id='+postId,
        })
    },
    onSwiperTap:function(event){
        var postId = event.target.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId,
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