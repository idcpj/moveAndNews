// pages/posts/posts.js
var util = require('../../utils/com.js');
var AppData = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        containerShow:true,
        searchpanelShow:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
    //正在热映
        this.getMovieLists('/v2/movie/in_theaters?start=0&count=3', {cate:"moviesIng",title:"正在上映"});
    //top250
        this.getMovieLists('/v2/movie/top250?start=0&count=3', { cate: "moviesTop", title: "电影Top250" });
    //即将上映
        this.getMovieLists('/v2/movie/coming_soon?start=0&count=3', { cate: "moviesWell", title:"即将上映"});
    },
    //异步获取数据
   getMovieLists:function(url,cate){
       var that = this;
       wx.request({
           url: AppData.globleData.g_base + url, //仅为示例，并非真实的接口地址
           method: 'GET',
           header: {
               "content-type": "appliction/json"
           },
           success: function (res) {
               that.processDoubanData(res.data, cate);
           },
       });
   },
   //数据绑定到data
   processDoubanData: function (moviesDouban, cates){   
       var movies = [];
       for (var idx in moviesDouban.subjects){
           var subject = moviesDouban.subjects[idx];
           var title = subject.title;//获取标题
           if(title.length>=6){
               title = title.substring(0,6)+'...';
           }
            //存入数据
            var temp = {
                starts: util.HaoManystartsArray(subject.rating.stars),
                title:title,
                average: subject.rating.average,
                converageUrl:subject.images.large,
                moiveId:subject.id,
            }   
            movies.push(temp);
       }
       var readyData = {};
       readyData[cates.cate] = { title:cates.title,movies: movies};
        this.setData(readyData);
        wx:wx.hideNavigationBarLoading();
   },
   //更多按钮
    onMoreTop:function(event){
        var cateId = event.currentTarget.dataset.categorty;
        wx:wx.navigateTo({
            url: 'more-movie/more-movie?cateId=' + cateId,
        })
    },
    //点击搜索效果
    onBindFocus:function(){
       this.setData({
           containerShow: false,
           searchpanelShow: true
       })
    },
    //搜索事件
    onbindinput: function (event){
        var text = event.detail.value;
        var urlData = AppData.globleData.g_base;
        
        this.getMovieLists("/v2/movie/search?q=" + text, { cate: "search", title: "搜索电影" });
        wx.setNavigationBarTitle({
            title: '搜索'
        });
        wx.showNavigationBarLoading();
        
    },
    //点叉隐藏
    onbindtap:function(){
        this.setData({
            containerShow: true,
            searchpanelShow: false,
            search:{}
        })
        wx.setNavigationBarTitle({
            title: '光与影'
        })

    },
    //点击电影跳详情
    toMovieDetail: function (event){
        var moiveid = event.currentTarget.dataset.moiveid;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?moiveid=' + moiveid,
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