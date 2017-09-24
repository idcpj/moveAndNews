var post_content = require('../../../data/posts-data.js');
var App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayMusic:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        //postId 对应的文章id
        var postId = options.id;
        this.data.postId = postId;//把获取的值赋值给data,方便其他方法调用
        var postData = post_content.postList[postId];
        this.setData(postData);
        

        //判断是否收藏
        this.setCollectedStatus(postId);

        //判断全局音乐播放状态
        this.onGlobeMusicStatus();
        
        //监听音乐播放
        this.setMusicMonitor();

        //获取所有文章收藏的缓存值
    },
    //判断是否收藏
    onGlobeMusicStatus:function(){
        if (App.globleData.g_isPlayMusic) {
            var currentPostId = this.data;
            wx.playBackgroundAudio({
                dataUrl: currentPostId.music.dataUrl,
                title: currentPostId.music.title,
                coverImgUrl: currentPostId.music.coverImgUrl
            });
            this.setData({ isPlayMusic: true });
        }
    },
    //收藏状态切换
    setCollectedStatus: function (postId){
        var postsCollected = wx.getStorageSync('postsCollected');
        //若缓存存在
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({ collcted: postsCollected[postId] });
        } else {//若缓存不存在
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('postsCollected', postsCollected);
        }
    },
    //监听音乐播放
    setMusicMonitor:function(){
        var that = this;
        //监听播放
        wx.onBackgroundAudioPlay(function () {
            that.setData({ isPlayMusic: true })
            App.globleData.g_isPlayMusic=true;
        });
        //监听暂停
        wx.onBackgroundAudioPause(function () {
            that.setData({ isPlayMusic: false });
            App.globleData.g_isPlayMusic = false;
        });
        //监听结束
        wx.onBackgroundAudioStop(function () {
            that.setData({ isPlayMusic: false });
            App.globleData.g_isPlayMusic = false;
        });
    },
    onCollectionTap:function(event){
        //获取缓存
        var postsCollected = wx.getStorageSync('postsCollected');
        //获取该文章的缓存
        var postCollected = postsCollected[this.data.postId];
        //点击取反
        postCollected = !postCollected;
        //存值
        postsCollected[this.data.postId] = postCollected;
        //复制给缓存
        wx.setStorageSync('postsCollected', postsCollected);
        //输出到模版
        this.setData({
         collcted: postCollected
        });
        //弹框
        wx.showToast({
            title: postCollected?"收藏成功":"取消收藏",
        })

    },
    //分享按钮
    onshareTap:function(){
        var itemLists=["分享到朋友圈", "分享到微博", "分享给好友", "分享到QQ"];
        wx.showActionSheet({
            itemList: itemLists,
            itemColor:"#405f80",
            success: function (res) {
                wx,wx.showModal({
                    title: '用户' + itemLists[res.tapIndex],
                    content: '用户是否取消分享?' + itemLists[res.tapIndex]+"现在无法获取分享功能",
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '',
                    confirmText: '分享',
                    confirmColor: '',
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                })
            },
        })
    },
    //音乐播放播放
    onMusicActionTap:function(event){
        var isPlayMusic = this.data.isPlayMusic;
        var currentPostId = this.data;
        //如果值存在,则点击暂停
        if(isPlayMusic){
            wx.pauseBackgroundAudio();
            this.setData({ isPlayMusic: false})
        }else{
            wx.playBackgroundAudio({
                dataUrl: currentPostId.music.dataUrl,
                title: currentPostId.music.title,
                coverImgUrl: currentPostId.music.coverImgUrl
            });
            this.setData({ isPlayMusic: true })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    success:function(){
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