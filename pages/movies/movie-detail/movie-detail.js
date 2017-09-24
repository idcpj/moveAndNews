// pages/movies/movie-detail/movie-detail.js
var utils = require("../../../utils/com.js");
var appData = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      movie:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var movieId = options.moiveid;
      var detaiUrl = appData.globleData.g_base + "/v2/movie/subject/" + movieId;
      utils.http(detaiUrl, this.processDoubanData);
      
  },
  //数据绑定到data
  processDoubanData: function (data) {
      var director={
            avatar:"",
            name:"",
            id:""
        };
        //获取演员的信息
        if (data.directors[0]!=null){
            if (data.directors[0].avatars !=null){
                director.avatar = data.directors[0].avatars.large;
            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        //赋值
        var movieDetail = {
            movieImg: data.images ? data.images.large:"",
            country:data.countries[0],
            title:data.title,
            originalTitle: data.original_title,
            wishCount:data.wish_count,
            commentCount:data.comments_count,
            year:data.year,
            generes:data.genres.join("、"),
            stars: utils.HaoManystartsArray(data.rating.stars),
            score:data.rating.average,
            director:director,
            casts: utils.convertToCastString(data.casts),
            castsInfo: utils.converToCastInfos(data.casts),
            summary: data.summary
        }
        this.setData({ movie: movieDetail });
  },
  //点击放大海报
  viewMoviePostImg:function(e){
        var src=e.currentTarget.dataset.src;
        wx.previewImage({
            current:src,
            urls: [src],
        })
  },
  viewMoviePerson:function(e){
     var src=e.currentTarget.dataset.src;
    //合成演员图片表
    var imgList =[];
    for(var idx in this.data.movie.castsInfo){
        imgList.push(this.data.movie.castsInfo[idx].img);
    }


        wx.previewImage({
            current:src,
            urls: imgList,
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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


})