var util = require('../../../utils/com.js');
var AppData = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies:{},
        navgateTitle: "",
        request:"",
        totalCount:0,
        isEmpty:true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var cateId = options.cateId;
        this.data.navgateTitle = cateId;//绑定参数到data中
        var urlData = AppData.globleData.g_base;
        switch (cateId) {
            case "正在上映":
                urlData +='/v2/movie/in_theaters'
                break;
            case "电影Top250":
                urlData +='/v2/movie/top250'
                break;
            case "即将上映":
                urlData +='/v2/movie/coming_soon'
                break;
        }
        this.data.request=urlData;
        //获取内容
        util.http(urlData +"?start=0&count=20", this.processDoubanData);


    },
    //下拉刷新
    onPullDownRefresh:function(){
        //初始化
        this.data.isEmpty=true;
        this.data.totalCount=0;

        util.http(this.data.request + "?start=0&count=20", this.processDoubanData);
    },
    //上拉刷新
    onReachBottom:function(){
        var nexUrl = this.data.request + "?start=" + this.data.totalCount + "&count=20";
        util.http(nexUrl, this.processDoubanData);
        wx.showNavigationBarLoading();//在导航栏显示login动画
    },
    
    //数据绑定到data
    processDoubanData: function (moviesDouban) {
        var movies = [];
        var totalMovies = {};
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;//获取标题
            if (title.length >= 6) {
                title = title.substring(0, 6) + '...';
            }
            //存入数据
            var temp = {
                starts: util.HaoManystartsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                converageUrl: subject.images.large,
                moiveId: subject.id,
            }
            movies.push(temp);
        }

        //判断是否是第一次加载数据
        if(!this.data.isEmpty){
            totalMovies = this.data.movies.concat(movies)
        }else{
            totalMovies=movies;
            this.data.isEmpty=false;
        }
        this.setData({ movies: totalMovies });
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
    },
    //点击电影跳详情
    toMovieDetail: function (event) {
        var moiveid = event.currentTarget.dataset.moiveid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?moiveid=' + moiveid,
        })
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
    */
    onReady: function () {
        wx.setNavigationBarTitle({
            //动态设置导航栏
            title: this.data.navgateTitle,
        })
    },

})